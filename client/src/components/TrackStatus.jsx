import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { IoIosCheckmark } from "react-icons/io";

const TrackStatus = () => {
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
              console.log(data);
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

  return (
    <div className="flex justify-center items-center h-screen p-5">
      <div className="border-2 rounded-sm p-10" ref={hide}>
        <div>
          <span className="font-semibold text-3xl">Track your status</span>
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
              Track Status
            </Button>
          ) : (
            <Button className="w-full mt-5">
              <Loader2 className="h-4 w-4 animate-spin" />
              please wait
            </Button>
          )}
        </div>
      </div>
      <div ref={block} className="hidden mt-25 sm:mt-0">
        <div className="border-2 border-black p-5 rounded-lg shadow shadow-black-500">
          <div className="text-center m-2">
            <span className="font-semibold text-3xl text-blue-500">
              Your current status
            </span>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="font-bold">
              Name:{" "}
              <span className="font-semibold text-sm md:text-lg">
                {getData?.data?.name}
              </span>
            </p>
            <p className="font-bold text-sm md:text-lg">
              Email:{" "}
              <span className="font-semibold">{getData?.data?.email}</span>
            </p>
            <p className="font-bold text-sm md:text-lg">
              Reference No:{" "}
              <span className="font-semibold">{getData?.data?.reference}</span>
            </p>
          </div>
          {/* validating */}
          <div className="mt-10 ">
            <span className="absolute  text-blue-600 font-bold text-sm md:text-lg">
              Account Created successFully
            </span>
            <div className="flex flex-col items-center justify-center ms-40">
              <div
                className={`border-3 border-gray-400 rounded-full ${
                  getData?.data?.email ? "p-0" : "p-4"
                }`}
              >
                {getData?.data?.email && (
                  <IoIosCheckmark className="text-4xl text-white  bg-blue-500 rounded-full font-bold" />
                )}
              </div>
              <div
                className={`h-15 p-1 rounded-full border border-gray-500 ${
                  getData?.data?.email ? "bg-blue-500" : ""
                }`}
              ></div>
            </div>
            <span className="absolute text-blue-500 font-bold text-sm md:text-lg">
              Client Add successFully
            </span>
            <div className="flex flex-col items-center justify-center ms-40 ">
              <div
                className={`border-3 border-gray-400 rounded-full ${
                  getData?.data?.Client_details ? "p-0" : "p-4"
                }`}
              >
                {getData?.data?.Client_details && (
                  <IoIosCheckmark className="text-4xl text-white  bg-blue-500 rounded-full font-bold" />
                )}
              </div>
              <div
                className={`h-15 p-1 rounded-full border border-gray-500 ${
                  getData?.data?.Client_details ? "bg-blue-500" : ""
                }`}
              ></div>
            </div>
            <span className="absolute text-blue-500 font-bold text-sm md:text-lg">
              Claim Add successFully
            </span>
            <div className="flex flex-col items-center justify-center ms-40">
              <div
                className={`border-3 border-gray-400 rounded-full ${
                  getData?.data?.addClaimStatus && getData?.data?.Client_details
                    ? "p-0"
                    : "p-4"
                }`}
              >
                {getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details && (
                    <IoIosCheckmark className="text-4xl text-white  bg-blue-500 rounded-full font-bold" />
                  )}
              </div>
              <div
                className={`h-15 p-1 rounded-full border border-gray-500 ${
                  getData?.data?.addClaimStatus && getData?.data?.Client_details
                    ? "bg-blue-500"
                    : ""
                }`}
              ></div>
            </div>
            <span className="absolute text-blue-500 font-bold text-sm md:text-lg">
              Upload Report successFully
            </span>

            <div className="flex flex-col items-center justify-center ms-40 ">
              <div
                className={`border-3 border-gray-400 rounded-full ${
                  getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus
                    ? "p-0"
                    : "p-4"
                }`}
              >
                {getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus && (
                    <IoIosCheckmark className="text-4xl text-white  bg-blue-500 rounded-full font-bold" />
                  )}
              </div>
              <div
                className={`h-15 p-1 rounded-full border border-gray-500 ${
                  getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus
                    ? "bg-blue-500"
                    : ""
                }`}
              ></div>
            </div>
            <span className="absolute text-blue-500 font-bold text-sm md:text-lg">
              varified by TPA
            </span>

            <div className="flex flex-col items-center justify-center ms-40">
              <div
                className={`border-3 border-gray-400 rounded-full ${
                  getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus &&
                  getData?.data?.Claim_details
                    ? "p-0"
                    : "p-4"
                }`}
              >
                {getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus &&
                  getData?.data?.Claim_details && (
                    <IoIosCheckmark className="text-4xl text-white  bg-blue-500 rounded-full font-bold" />
                  )}
              </div>
              <div
                className={`h-15 p-1 rounded-full border border-gray-500 ${
                  getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus &&
                  getData?.data?.Claim_details
                    ? "bg-blue-500"
                    : ""
                }`}
              ></div>
            </div>
            <span className="absolute text-blue-500 font-bold text-sm md:text-lg">
              Claimed successFully
            </span>

            <div className="flex flex-col items-center justify-center ms-40">
              <div
                className={`border-3 border-gray-400 rounded-full ${
                  getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus &&
                  getData?.data?.Claim_details &&
                  getData?.data?.ReportStatus
                    ? "p-0"
                    : "p-4"
                }`}
              >
                {getData?.data?.addClaimStatus &&
                  getData?.data?.Client_details &&
                  getData?.data?.uploadStatus &&
                  getData?.data?.Claim_details &&
                  getData?.data?.ReportStatus && (
                    <IoIosCheckmark className="text-4xl text-white  bg-blue-500 rounded-full font-bold" />
                  )}
              </div>
            </div>
          </div>
          {getData?.data?.issues?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold">Issues</h2>
              {getData?.data?.issues.map((items, index) => {
                return (
                  <li key={index} className="text-red-500">
                    {items}
                  </li>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackStatus;
