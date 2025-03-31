import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Userinfo = () => {
  const [user, setUser] = useState([]); // Ensures array structure
  const [input, setInput] = useState({ notification: "" });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const successHandler = async (data) => {
    console.log(input);
    if (input.notification.length < 20) {
      toast.error("Please enter a reason (at least 20 characters)");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/sendresponse/${data.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input }),
        }
      );

      const responseData = await res.json();
      if (responseData.success) {
        toast.success(responseData.message);
        setInput({ notification: "" }); // Reset after success
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Failed to send response");
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/get", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setUser(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.info("No Record  Found");
          setUser([]);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  if (user.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-2xl font-semibold text-red-500">No Record Found</p>
        <Link to="/" className="underline text-blue-600 mt-5">
          Go To Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10 w-full px-4 sm:px-0">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="font-bold text-2xl underline text-center mb-5">
          Client_details
        </h1>
        {user.map((items, index) => (
          <div
            key={index}
            className="border-2 border-black rounded-2xl p-5 w-full sm:w-[80%] lg:w-[60%] my-3 shadow-lg bg-white"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p className="font-bold">Name:</p> <p>{items?.name || "NA"}</p>
              <p className="font-bold">Mobile no:</p>{" "}
              <p>{items?.Client_details?.mobileNo || "NA"}</p>
              <p className="font-bold">Pan no:</p>{" "}
              <p>{items?.Client_details?.panCardNo || "NA"}</p>
              <p className="font-bold">Email:</p> <p>{items?.email || "NA"}</p>
              <p className="font-bold">Password:</p> <p>**********</p>
            </div>

            <h2 className="font-bold text-blue-500 mt-4">Claim Details</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p className="font-bold">CardId:</p>{" "}
              <p>{items?.Claim_details?.cardId || "NA"}</p>
              <p className="font-bold">Policy-Number:</p>{" "}
              <p>{items?.Claim_details?.policyNumber || "NA"}</p>
              <p className="font-bold">Insurance-Company:</p>{" "}
              <p>{items?.Claim_details?.insuranceCompany || "NA"}</p>
              <p className="font-bold">Hospital-Name:</p>{" "}
              <p>{items?.Claim_details?.hospitalName || "NA"}</p>
              <p className="font-bold">ProviderName:</p>{" "}
              <p>{items?.Claim_details?.providerName || "NA"}</p>
              <p className="font-bold">Claim-Amount:</p>{" "}
              <p>{items?.Claim_details?.claimAmount || "NA"}</p>
              <p className="font-bold">Bank-Name:</p>{" "}
              <p>{items?.Claim_details?.bankName || "NA"}</p>
              <p className="font-bold">Bank-Account-Number:</p>{" "}
              <p>{items?.Claim_details?.bankAccountNumber || "NA"}</p>
              <p className="font-bold">IFSC-code:</p>{" "}
              <p>{items?.Claim_details?.ifscCode || "NA"}</p>
            </div>

            <h2 className="font-bold text-blue-500 mt-4">Client Details</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p className="font-bold">Aadhar no:</p>{" "}
              <p>{items?.Client_details?.aadharNo || "NA"}</p>
              <p className="font-bold">PinCode:</p>{" "}
              <p>{items?.Client_details?.pinCode || "NA"}</p>
              <p className="font-bold">State:</p>{" "}
              <p>{items?.Client_details?.state || "NA"}</p>
              <p className="font-bold">Status:</p>
              {items?.Claim_details?.status === true ? (
                <span className="text-green-500 font-semibold">Success</span>
              ) : items?.Claim_details?.status === false ? (
                <span className="text-red-500 font-semibold">Rejected</span>
              ) : (
                <span className="text-yellow-500 font-semibold">Pending</span>
              )}
            </div>

            <div className="mt-5">
              <Input
                className="border-black w-full"
                type="text"
                name="notification"
                value={input.notification}
                onChange={changeHandler}
                placeholder="Send a message (min 20 characters)"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={() => successHandler(items)}
                className="font-bold bg-blue-600 text-white"
              >
                Send
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userinfo;
