import axios from "axios";

function getCSRFToken() {
    let csrfToken;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const parts = cookie.split('=');
        if (parts[0].trim() === 'csrftoken') {
            csrfToken = parts[1];
            break;
        }
    }
    return csrfToken;
}

export const fetchDelete = async (endpoint) => {
    try {
        const port = 8000;
        const url = `http://localhost:${port}/crm/${endpoint}`
        const response = await axios.delete(url, {
            withCredentials: true,
            headers: {'X-CSRFToken': getCSRFToken()}
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
