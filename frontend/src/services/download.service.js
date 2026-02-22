import axios from "axios";

const API_URL = "http://localhost:8080/api/downloads";

const getDownloadForPlatform = (platform) => {
    return axios.get(`${API_URL}/${platform}`);
};

const downloadFile = (platform) => {
    window.location.href = `${API_URL}/${platform}/download`;
};

export default {
    getDownloadForPlatform,
    downloadFile
};