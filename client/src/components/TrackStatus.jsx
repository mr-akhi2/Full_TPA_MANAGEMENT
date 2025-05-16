import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

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
      await fetch("http://localhost:8080/uploadFile/reference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
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
      <div ref={block} className="hidden">
        <div className="border-2 p-5 rounded-lg">
          <div className="text-center m-2">
            <span className="font-semibold text-2xl">Your current status</span>
          </div>
          <div className="flex gap-5">
            <p className="font-bold">
              Name: <span className="font-semibold">{getData?.data?.name}</span>
            </p>
            <p className="font-bold">
              Email:{" "}
              <span className="font-semibold">{getData?.data?.email}</span>
            </p>
            <p className="font-bold">
              Reference No:{" "}
              <span className="font-semibold">{getData?.data?.reference}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackStatus;
