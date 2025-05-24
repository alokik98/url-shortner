import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // You can add any response interceptors here if needed
    return response;
},
  (error) => {
    // Handle response errors
    if (error.response) {
        // The request was made and the server responded with a status code
        const {status, data} = error.response;
        switch (status) {
            case 400:
                console.error("Bad Request:", data.message || "Invalid request data");
                break;
            case 401:
                console.error("Unauthorized:", data.message || "Authentication required");
                break;
            case 403:
                console.error("Forbidden:", data.message || "You do not have permission to access this resource");
                break;
            case 404:
                console.error("Not Found:", data.message || "The requested resource could not be found");
                break;
            case 500:
                console.error("Internal Server Error:", data.message || "An unexpected error occurred on the server");
                break;
            default:
                console.error(`Error ${status}:`, data.message || "An error occurred");
                break;
        }
    }
    else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
    }
    else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
    }
    return Promise.reject({
        message: error.message || "An error occurred while processing your request",
        status: error.response ? error.response.status : null,
        data: error.response ? error.response.data : null,
    });
  }
);

export default axiosInstance;