import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
import os

# Initialize Firestore
cred = credentials.Certificate(r"backend\women-6655c-firebase-adminsdk-fbsvc-114d33341b.json")  # Replace with your JSON file
firebase_admin.initialize_app(cred)
db = firestore.client()

# Function to upload CSV data to Firestore
def upload_csv_to_firestore(csv_file, collection_name):
    if not os.path.exists(csv_file):
        print(f"Error: File '{csv_file}' does not exist.")
        return
    df = pd.read_csv(csv_file)
    for index, row in df.iterrows():
        doc_ref = db.collection(collection_name).document(str(index))
        doc_ref.set(row.to_dict())
    print(f"Uploaded {csv_file} to Firestore collection '{collection_name}'")

# Uploading different datasets
upload_csv_to_firestore(r"firestore\course_metadata.csv", "Courses")
upload_csv_to_firestore(r"firestore\user_profiles.csv", "UserProfiles")  # Fixed file name
upload_csv_to_firestore(r"firestore\user_engagement.csv", "UserEngagement")


#fetch from firestore
def fetch_data(collection_name):
    docs = db.collection(collection_name).stream()
    data = [doc.to_dict() for doc in docs]
    return data

courses = fetch_data("Courses")
print(courses)

