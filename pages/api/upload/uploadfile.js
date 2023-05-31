import fs from "fs-extra";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/assets/images/brands"; // Directory where the uploaded files will be stored

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const file = files.file; // 'file' should match the field name in your file input

    // Handle the file upload here
    handleFileUpload(file)
      .then(() => {
        res.status(200).json({ message: "File uploaded successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error handling file upload" });
      });
  });
}

async function handleFileUpload(file) {
  const uploadPath = "./public/Assets/Images/brands/" + file.originalFilename;

  try {
    await fs.ensureDir("./public/assets/images/brands"); // Create the upload directory if it doesn't exist
    await fs.move(file.filepath, uploadPath); // Move the uploaded file to the desired location

    // Additional processing or validation logic can be added here

    console.log("File saved at:", uploadPath);
  } catch (error) {
    // Handle any errors that occur during the file upload process
    console.error("Error handling file upload:", error);
    throw error;
  }
}
