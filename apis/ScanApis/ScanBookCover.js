const scanBookCover = async (imageFile) => {
  const API_URL = `http://192.168.0.107:8000/api/book/scan`;
  console.log("Sending image:", imageFile);

  const formData = new FormData();
  formData.append("file", {
    uri: imageFile.uri,
    name: imageFile.name || "photo.jpg",
    type: imageFile.type || "image/jpeg",
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    });

    let data;
    try {
      data = await response.json();
      console.log("Parsed response:", data);
    } catch (jsonErr) {
      console.error("Failed to parse JSON:", jsonErr);
      const rawText = await response.text();
      return {
        success: false,
        error: "Invalid JSON response",
        details: rawText,
        statusCode: response.status,
      };
    }

    if (response.ok && data.success) {
      return {
        success: true,
        data: data.data,
        processingTime: data.data.total_processing_time_ms,
      };
    } else {
      return {
        success: false,
        error: data.error || "Unknown error",
        details: data.details || "No additional details provided",
        statusCode: response.status,
      };
    }
  } catch (error) {
    console.log("Fetch Error:", error);
    return {
      success: false,
      error: "Network Error",
      details: error.message || "No response received from server",
      statusCode: 0,
    };
  }
};

export default scanBookCover;
