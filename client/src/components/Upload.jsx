import React, { useContext, useState } from "react";
import upload from "../pages/images/upload.png";
import { UserContext } from "../pages/context/UserContext";
import { toast } from "react-toastify";

const Upload = () => {
  const { userData } = useContext(UserContext);
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle file upload to API
  const handleUpload = async () => {
    const email = userData?.data?.email;

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // console.log(file);
    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await fetch(
        `http://localhost:8080/uploadFile/file/${email}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((resp) => {
          return resp.json();
        })
        .then((resData) => {
          // console.log(resData);
          if (resData.success) {
            toast.success(resData.message);
          } else {
            toast.success(resData.message);
          }
        });
    } catch (error) {
      toast.error(error);
      toast.error("Failed to upload PDF");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="border-2 border-black p-10 rounded-2xl text-center">
        <h1 className="font-bold underline p-8 text-2xl">Upload Report</h1>
        <div className="flex flex-col items-center">
          <input
            type="file"
            className="hidden"
            id="upload"
            onChange={handleFileChange}
            accept="application/pdf"
          />
          <label htmlFor="upload" className="cursor-pointer">
            <img src={upload} alt="Upload" className="h-20 w-20 mt-3" />
          </label>
          {file && <p className="mt-2 text-sm">📄 {file.name}</p>}
          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
