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

export const fetchPost = async (endpoint: string, data: any) => {
    const port = 8000;
    const url = `http://localhost:${port}/crm/${endpoint}`;
    try {
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {'X-CSRFToken': getCSRFToken()}
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при отправке запроса:', response.statusText);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
};
