const API_URL = "http://127.0.0.1:5001/chat";

async function sendMessage(message) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });
    const data = await response.json();
    console.log(data.response);
}