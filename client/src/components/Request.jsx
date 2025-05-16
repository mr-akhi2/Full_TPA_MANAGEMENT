import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../pages/context/UserContext";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";

const Request = () => {
  const { userData } = useContext(UserContext);
  // console.log(userData?.data?.Claim_details);
  // console.log(userData?.data?.disease_details?.Status);
  // console.log(userData?.data?.disease_details);

  const [count, setCount] = useState(0);
  const [Varify, setvarified] = useState();
  const [Issues, setIssues] = useState([]);

  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = async () => {
    setCompleted(true);
    setCount(0); // Reset progress
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setCompleted(false); // Hide progress after completion
          return 100;
        }
      });
    }, 50);
    const email = await userData?.data?.email;
    const resp = await fetch(
      `http://localhost:8080/uploadFile/varify/${email}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((respData) => {
        console.log(respData);
        if (respData.success) {
          setTimeout(() => {
            toast.success(respData.message);

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }, 5000);
        } else {
          setTimeout(() => {
            toast.error(respData.message);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }, 4000);
        }
      });
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCompleted(false);
  };

  return (
    <div className="h-full sm:h-screen">
      <div className="flex items-center justify-center">
        <div>
          <div className="flex items-center flex-col justify-center sm:flex-row">
            <div className="m-5 border-3 h-[330px] w-[250px] rounded-md p-2">
              <h1 className="font-semibold text-center text-xl">
                Client_Details
              </h1>
              <div className="flex justify-around mt-5">
                <span className="font-semibold">firstName :</span>
                <span>{userData?.data?.Client_details?.firstName}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">LastName :</span>
                <span>{userData?.data?.Client_details?.lastName}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">Mobile :</span>
                <span>{userData?.data?.Client_details?.mobileNo}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">AadharNo :</span>
                <span>{userData?.data?.Client_details?.aadharNo}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">BankName :</span>
                <span>{userData?.data?.Client_details?.bankName}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">IfscCode :</span>
                <span>{userData?.data?.Client_details?.ifscCode}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">panCardNo :</span>
                <span>{userData?.data?.Client_details?.panCardNo}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">branchName :</span>
                <span>{userData?.data?.Client_details?.branchName}</span>
              </div>
            </div>
            <div className="m-5 border-3 h-[330px] w-[250px] rounded-md p-2">
              <h1 className="font-semibold text-center text-xl">
                Claim_Details
              </h1>
              <div className="flex justify-around mt-5">
                <span className="font-semibold">Name :</span>
                <span>{userData?.data?.Claim_details?.name}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">CardId :</span>
                <span>{userData?.data?.Claim_details?.cardId}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">policyNumber :</span>
                <span>{userData?.data?.Claim_details?.policyNumber}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">ClaimAmount :</span>
                <span>{userData?.data?.Claim_details?.claimAmount}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">HospitalName :</span>
                <span>{userData?.data?.Claim_details?.hospitalName}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">BankName :</span>
                <span>{userData?.data?.Claim_details?.bankName}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">providerName :</span>
                <span>{userData?.data?.Claim_details?.providerName}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">insuranceCompany :</span>
                <span>{userData?.data?.Claim_details?.insuranceCompany}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center sm:flex-row">
            <div className="m-5 border-3 rounded-md p-2">
              <h1 className="font-semibold text-center text-xl">PDF_Details</h1>
              <div className="flex justify-around mt-5">
                <span className="font-semibold">Name :</span>
                <span>{userData?.data?.Claim_details?.name}</span>
              </div>
              <div className="flex justify-around mt-5">
                <span className="font-semibold">Email :</span>
                <span>{userData?.data?.disease_details?.email}</span>
              </div>

              <div className="flex justify-around mt-2">
                <span className="font-semibold">billAmmount :</span>
                <span>{userData?.data?.disease_details?.billAmmount}</span>
              </div>
              <div className="flex justify-around mt-2">
                <span className="font-semibold">Disease_name :</span>
                <span>{userData?.data?.disease_details?.disease_name}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-[10px] h-[480px] border-2 rounded-full relative left-3 sm:right-[-10px] md:right-[-60px] ${
            userData?.data?.disease_details?.Status == true
              ? "bg-green-500"
              : userData?.data?.disease_details?.Status == false
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          <div className="flex flex-col">
            <span className="h-8 w-8 border-3 rounded-full absolute top-[215px] left-[-12px] bg-white">
              {userData?.data?.disease_details?.Status == true ? (
                <IoIosCheckmark className="text-3xl text-white  bg-green-500 rounded-full font-bold" />
              ) : userData?.data?.disease_details?.Status == false ? (
                <MdOutlineCancel className="text-3xl text-white  bg-red-500 rounded-full font-bold" />
              ) : (
                <MdOutlinePending className="text-3xl text-white  bg-yellow-500 rounded-full font-bold" />
              )}
            </span>
            <span className="h-8 w-8 border-3 rounded-full absolute top-[-22px] left-[-12px] bg-white">
              {userData?.data?.disease_details?.Status == true ? (
                <IoIosCheckmark className="text-3xl text-white  bg-green-500 rounded-full font-bold" />
              ) : userData?.data?.disease_details?.Status == false ? (
                <MdOutlineCancel className="text-3xl text-white  bg-red-500 rounded-full font-bold" />
              ) : (
                <MdOutlinePending className="text-3xl text-white  bg-yellow-500 rounded-full font-bold" />
              )}
            </span>
            <span className="h-8 w-8 border-3 rounded-full absolute top-[455px] left-[-11px] bg-white">
              {userData?.data?.disease_details?.Status == true ? (
                <IoIosCheckmark className="text-3xl text-white  bg-green-500 rounded-full font-bold" />
              ) : userData?.data?.disease_details?.Status == false ? (
                <MdOutlineCancel className="text-3xl text-white  bg-red-500 rounded-full font-bold" />
              ) : (
                <MdOutlinePending className="text-3xl text-white  bg-yellow-500 rounded-full font-bold" />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger>
            <span className="bg-blue-500 text-white p-2 border-2 rounded-md">
              Click Here To Varify
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              {completed ? (
                <div className="flex items-center justify-center  h-[200px]">
                  <div className="w-full p-4 bg-blue-400 border-4 rounded-xl shadow-lg text-center ">
                    <h1 className="text-xl font-semibold mb-4">
                      {count < 100 ? "Please wait" : "Completed!"}
                    </h1>

                    {/* Progress Bar */}
                    <div className="w-full bg-white h-6 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          count < 100 ? "bg-blue-500" : "bg-green-500"
                        }`}
                        style={{ width: `${count}%` }}
                      ></div>
                    </div>

                    {/* Percentage Display */}
                    <p className="mt-2 text-lg font-bold">{count}%</p>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-center">
                      {count < 100 ? (
                        <button
                          onClick={handleStop}
                          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all w-full"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => setCompleted(false)}
                          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all w-full"
                        >
                          Done
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="mt-4 flex justify-center">
                    {userData?.data?.disease_details?.Status ? (
                      <div>
                        <h1 className="text-center font-semibold mb-4 text-xl">
                          Your Document is varified
                        </h1>
                        <button className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition-all w-64">
                          Verified
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleStart}
                        className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-all w-64"
                      >
                        Verify Document
                      </button>
                    )}
                  </div>
                </div>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            {userData?.data?.disease_details?.Status || (
              <span className=" text-lg text-blue-500 underline ms-10">
                view
              </span>
            )}
          </DialogTrigger>
          <DialogContent>
            <h1 className="text-center text-red-500 font-bold">
              Rejected Issues
            </h1>
            <ul className="text-center">
              {userData?.data?.disease_details?.issues ? (
                userData?.data?.disease_details?.issues.map((items, index) => {
                  return (
                    <li key={index} className="text-sm text-red-400">
                      {items}
                    </li>
                  );
                })
              ) : (
                <>No Issues</>
              )}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Request;
