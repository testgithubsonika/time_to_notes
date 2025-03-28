import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase"; // Updated import path

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        async function fetchCourses() {
            try {
                const querySnapshot = await getDocs(collection(db, "Courses"));
                const courseList = querySnapshot.docs.map(doc => doc.data());
                setCourses(courseList);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        }
        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Available Courses</h1>
            {loading ? (
                <p>Loading courses...</p>
            ) : courses.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>
                            <strong>{course.Title}</strong> - {course.Category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Courses;
