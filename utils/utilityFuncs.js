export async function uploadFileToServer(file, fileType) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", fileType);

  try {
    const response = await fetch("/api/upload/uploadfile", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // File uploaded successfully
    } else {
      console.error("File upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
