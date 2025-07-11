import axios from "axios";


const scanBookCover = async (imageFile) => {

  const API_URL = `https://ac69186f1a37.ngrok-free.app/api/book/scan`;
  console.log(API_URL);
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 30 seconds timeout
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        processingTime: response.data.data.total_processing_time_ms,
      };
    }

    return {
      success: false,
      error: response.data.error || "Unknown error",
      details: response.data.details || "No additional details provided",
      statusCode: response.status,
    };
  } catch (error) {
    console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        success: false,
        error: error.response.data.error || "API Error",
        details: error.response.data.details || error.message,
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        error: "Network Error",
        details: "No response received from server",
        statusCode: 0,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        error: "Request Error",
        details: error.message,
        statusCode: 0,
      };
    }
  }
};

export default scanBookCover;
