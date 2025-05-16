import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import upload from "../pages/images/upload.png";

const Doctor = () => {
  const [file, setFile] = useState(null);

  const hide = useRef();
  const block = useRef();
  const [data, setData] = useState({
    email: "",
    reference: "",
  });
  const [loder, setloader] = useState(false);
  const [getData, setGetData] = useState({});

  const fetchStatus = async () => {
    setloader(true);
    try {
      await fetch(
        "https://full-tpa-management.onrender.com/uploadFile/reference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            // console.log(data);
            if (data) {
              hide.current.style.display = "none";
              block.current.style.display = "block";
              setGetData(data);
            }
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      toast.error(error);
    } finally {
      setloader(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    const email = getData?.data?.email;

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // console.log(file);
    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await fetch(
        `https://full-tpa-management.onrender.com/uploadFile/file/${email}`,
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
    <div className="flex justify-center items-center h-screen p-5">
      <div className="border-2 rounded-sm p-10 " ref={hide}>
        <div>
          <span className="font-semibold text-3xl">Upload Report</span>
        </div>
        <div className="mt-4">
          <Input
            type="text"
            name="email"
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            value={data.email}
            placeholder="Enter your email"
            className="mt-3"
          />
          <Input
            type="text"
            name="reference"
            onChange={(e) =>
              setData((prev) => ({ ...prev, reference: e.target.value }))
            }
            value={data.reference}
            placeholder="Enter your reference no"
            className="mt-3 w-full"
          />
          {!loder ? (
            <Button onClick={fetchStatus} className="w-full mt-5">
              Find User
            </Button>
          ) : (
            <Button className="w-full mt-5">
              <Loader2 className="h-4 w-4 animate-spin" />
              please wait
            </Button>
          )}
        </div>
      </div>
      <div ref={block} className="hidden">
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
      </div>
    </div>
  );
};

export default Doctor;
