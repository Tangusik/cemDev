import axios from "axios";

export const fetchGet = async (endpoint) => {
    try {
        const port = 8000;
        axios.defaults.baseURL = `http://localhost:${port}`;
        axios.defaults.withCredentials = true;
        const response = await axios.get(`crm/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};