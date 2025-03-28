import { useState } from "react";

function Recommendations() {
    const [courses, setCourses] = useState([]);

    async function fetchRecommendations(userId) {
        const response = await fetch("http://your-aws-server-ip/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId })
        });

        const data = await response.json();
        setCourses(data.recommended_courses);
    }

    return (
        <div>
            <button onClick={() => fetchRecommendations(101)}>Get Recommendations</button>
            <ul>
                {courses.map((course, index) => <li key={index}>{course}</li>)}
            </ul>
        </div>
    );
}

export default Recommendations;
