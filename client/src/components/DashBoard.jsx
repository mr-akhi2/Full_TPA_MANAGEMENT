import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [user, setUser] = useState([]); // Ensure it starts as an array
  const [input, setInput] = useState({ comment: "" });

  // Handles input change
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handles both success and rejection
  const handleResponse = async (data, status) => {
    const email = data.email;
    if (input.comment.length < 20) {
      toast.error("Please enter a reason (minimum 20 characters)");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/sendresponse/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, status }),
      });

      const responseData = await res.json();
      if (responseData.success) {
        toast.success(responseData.message);
        setInput({ comment: "" }); // Reset input after success
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Failed to send response");
    }
  };

  // Fetch user data
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/get", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setUser(Array.isArray(data.data) ? data.data : []); // Ensure it's always an array
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.info("No Record  Found");
          setUser([]); // Prevent undefined state
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  // No records found case
  if (!user || user.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-2xl font-semibold text-red-500 mt-4">
          No Record Found
        </p>
        <Link to="/" className="underline mt-5">
          Go To Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10 w-full">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl underline text-center">DashBoard</h1>

        {user.map((items, index) => (
          <div
            key={index}
            className="border-3 border-black mt-5 flex flex-col justify-center rounded-2xl m-3 w-full p-4"
          >
            <div className="flex justify-between px-5">
              <h1 className="font-semibold text-sm">Time/Date</h1>
              <span className="text-sm">{items?.createdAt}</span>
            </div>

            <h1 className="text-center text-xl font-bold mt-5 underline">
              User Information
            </h1>
            <div className="p-5 m-2 mt-5">
              {Object.entries(items.Claim_details || {}).map(([key, value]) => (
                <div className="flex justify-between" key={key}>
                  <h1 className="font-bold">
                    {key.replace(/([A-Z])/g, " $1")} -
                  </h1>
                  <span>{value}</span>
                </div>
              ))}

              <div className="flex justify-between">
                <h1 className="font-bold">Status -</h1>
                {items?.Claim_details?.status === true ? (
                  <span className="text-green-500 font-semibold">Success</span>
                ) : items?.Claim_details?.status === false ? (
                  <span className="text-red-500 font-semibold">Rejected</span>
                ) : (
                  <span className="text-yellow-500 font-semibold">Pending</span>
                )}
              </div>

              <div className="flex justify-between mt-4 space-x-4">
                <Button
                  onClick={() => handleResponse(items, false)}
                  className="font-bold bg-red-600"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleResponse(items, true)}
                  className="font-bold bg-green-600"
                >
                  Approve
                </Button>
              </div>

              <div className="mt-5">
                <Input
                  className="border-black"
                  type="text"
                  name="comment"
                  value={input.comment}
                  onChange={changeHandler}
                  placeholder="Enter the reason (min 20 characters)"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
