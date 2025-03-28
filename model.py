import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load course data
course_data = pd.read_csv(r"firestore/course_metadata.csv")
if course_data.empty:
    raise ValueError("The course data is empty.")
if 'Description' not in course_data.columns:
    raise KeyError("The 'Description' column is missing from the course metadata CSV file.")

# Load user engagement data
engagement_data = pd.read_csv(r"firestore/user_engagement.csv")
if engagement_data.empty:
    raise ValueError("The user engagement data is empty.")

# Load user profiles data
user_profiles = pd.read_csv(r"firestore/user_profiles.csv")
if user_profiles.empty:
    raise ValueError("The user profiles data is empty.")

# Ensure required columns exist in user engagement data
required_engagement_columns = ['User ID', 'Course ID', 'Quiz Score (%)', 'Watch Time (Minutes)']
for col in required_engagement_columns:
    if col not in engagement_data.columns:
        raise KeyError(f"Missing column '{col}' in user engagement data.")

# Ensure required columns exist in user profiles data
required_profile_columns = ['User ID', 'Skills', 'Interests', 'Learning Pace']
for col in required_profile_columns:
    if col not in user_profiles.columns:
        raise KeyError(f"Missing column '{col}' in user profiles data.")

# Derive a 'rating' column (e.g., use Quiz Score (%) as the rating)
engagement_data['rating'] = engagement_data['Quiz Score (%)']

# Rename columns for consistency
engagement_data.rename(columns={'User ID': 'user_id', 'Course ID': 'course_id'}, inplace=True)

# Convert course descriptions into numerical vectors
vectorizer = TfidfVectorizer(stop_words='english')
course_vectors = vectorizer.fit_transform(course_data['Description'])

# Function to recommend courses based on a given course
def recommend_courses(course_title, num_recommendations=5):
    if course_title not in course_data['Title'].values:
        raise ValueError(f"Course title '{course_title}' not found in course data.")
    idx = course_data[course_data['Title'] == course_title].index[0]
    similarity_scores = cosine_similarity(course_vectors[idx], course_vectors).flatten()
    similar_courses = course_data.iloc[similarity_scores.argsort()[-num_recommendations-1:-1]]
    return similar_courses[['Title', 'Category', 'Difficulty']]

# Create a user-item matrix
user_item_matrix = engagement_data.pivot_table(index='user_id', columns='course_id', values='rating')

# Fill missing values with 0
user_item_matrix_filled = user_item_matrix.fillna(0)

# Calculate user similarity
user_similarity = cosine_similarity(user_item_matrix_filled)
user_similarity_df = pd.DataFrame(user_similarity, index=user_item_matrix.index, columns=user_item_matrix.index)

# Function to recommend courses for a user based on engagement
def recommend_for_user(user_id, num_recommendations=5):
    if user_id not in user_item_matrix.index:
        raise ValueError(f"User ID '{user_id}' not found in ratings data.")

    # Get the similarity scores for the target user
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)

    # Get courses rated by similar users
    similar_users_ratings = user_item_matrix.loc[similar_users.index]

    # Calculate weighted average ratings for unseen courses
    weighted_ratings = similar_users_ratings.T.dot(similar_users) / similar_users.sum()

    # Filter out courses the user has already rated
    user_rated_courses = user_item_matrix.loc[user_id].dropna().index
    recommendations = weighted_ratings.drop(user_rated_courses).sort_values(ascending=False)

    return recommendations.head(num_recommendations).index.tolist()

# Function to recommend courses based on user profiles
def recommend_based_on_profile(user_id, num_recommendations=5):
    if user_id not in user_profiles['User ID'].values:
        raise ValueError(f"User ID '{user_id}' not found in user profiles.")

    # Get the user's profile
    user_profile = user_profiles[user_profiles['User ID'] == user_id].iloc[0]
    user_skills = user_profile['Skills']
    user_interests = user_profile['Interests']

    # Filter courses based on user's skills and interests
    filtered_courses = course_data[
        course_data['Category'].str.contains(user_skills, case=False, na=False) |
        course_data['Category'].str.contains(user_interests, case=False, na=False)
    ]

    # If there are more courses than needed, recommend the top ones based on difficulty
    if len(filtered_courses) > num_recommendations:
        filtered_courses = filtered_courses.sort_values(by='Difficulty').head(num_recommendations)

    return filtered_courses[['Title', 'Category', 'Difficulty']]

# Example usage
print("Content-Based Recommendations:")
print(recommend_courses("Handicrafts for Beginners", num_recommendations=5))

print("\nEngagement-Based Recommendations:")
print(recommend_for_user(1001, num_recommendations=5))

print("\nProfile-Based Recommendations:")
print(recommend_based_on_profile(1001, num_recommendations=5))

