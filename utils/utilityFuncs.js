// toastify
import { toast } from "react-toastify";

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

export function raiseToast(type, message) {
  const toastOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (type) {
    case "success":
      toast.success(message, { ...toastOptions });
      break;
    case "error":
      toast.error(message, { ...toastOptions });
      break;
    default:
      toast.info(message, { ...toastOptions });
  }
}
