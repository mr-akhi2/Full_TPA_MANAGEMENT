import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../pages/context/UserContext";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { MdArrowOutward } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function ClaimStatus() {
  const { userData } = useContext(UserContext);
  // console.log(userData);

  // deleteClaimHandler
  const deleteClaimHandler = async (userEmail) => {
    const email = userEmail.email;
    const conf = confirm("Are you sure to delete your claim");
    if (conf) {
      try {
        await fetch(
          `https://full-tpa-management.onrender.com/deleteClaim/${email}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            // console.log(data);
            if (data.success) {
              toast.success(data.message);
              window.location.replace("/");
              setFormData(initialt_data);
            } else {
              toast.error(data.message);
            }
          })
          .catch((e) => {
            // console.log(e);
          });
      } catch (error) {
        // console.log(error);

        toast.error("server error");
      }
    }
  };

  if (!userData?.data?.Claim_details?.name) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-center text-2xl text-red-500 mt-4">
          No records found
        </p>
        <Link
          to="/claim"
          className="text-blue-600 mt-3 font-semibold underline"
        >
          Claim Add
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-6">Claim Status</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 border">Date Created</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">View</th>
              <th className="py-2 px-4 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-t">
              <td className="py-2 px-4 border">{userData?.data?.updatedAt}</td>
              <td className="py-2 px-4 border">
                {userData?.data?.Claim_details?.name}
              </td>
              <td className="py-2 px-4 border">
                {userData?.data?.Claim_details?.address}
              </td>
              {
                <td
                  className={`py-2 px-4 border font-bold 
  ${
    userData?.data?.Claim_details?.status === true
      ? "text-green-500"
      : userData?.data?.Claim_details?.status === false
      ? "text-red-500"
      : "text-yellow-500"
  }`}
                >
                  {userData?.data?.Claim_details?.status === true
                    ? "Success"
                    : userData?.data?.Claim_details?.status === false
                    ? "Rejected"
                    : "Pending"}
                </td>
              }
              <td className="py-2 px-4 border">
                <Dialog>
                  <DialogTrigger className="font-semibold text-blue-500 underline">
                    View
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      {/* <DialogTitle>Issues</DialogTitle> */}
                      {
                        <td
                          className={`py-2 px-4 text-center underline font-bold 
  ${
    userData?.data?.Claim_details?.status === true
      ? "text-green-500"
      : userData?.data?.Claim_details?.status === false
      ? "text-red-500 font-bold text-xl"
      : "text-yellow-500"
  }`}
                        >
                          {userData?.data?.Claim_details?.status === true
                            ? "Approved"
                            : userData?.data?.Claim_details?.status === false
                            ? "Issues"
                            : "Pending"}
                        </td>
                      }
                      <DialogDescription className="text-black text-center font-semibold text-lg">
                        {userData?.data?.Claim_details?.comments ? (
                          <span className="font-bold text-xl">Reason-</span>
                        ) : (
                          <>
                            <span className="font-bold text-sm">
                              your clain is under pending..
                            </span>
                          </>
                        )}

                        {userData?.data?.Claim_details?.comments}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </td>
              <td className="py-2 px-4  text-red-500 text-xl flex justify-center">
                <MdDelete onClick={() => deleteClaimHandler(userData.data)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Link
          to="/Request"
          className=" flex text-blue-500 text-center hover:text-gray-400"
          style={{ textDecoration: "none" }}
        >
          <span>Request Claim</span>
          <MdArrowOutward className="mt-1 ms-1" />
        </Link>
      </div>
    </div>
  );
}

export default ClaimStatus;
