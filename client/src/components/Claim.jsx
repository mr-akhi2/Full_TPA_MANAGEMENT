import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../pages/context/UserContext";

const Claim = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const initialt_data = {
    name: "",
    cardId: "",
    policyNumber: "",
    insuranceCompany: "",
    hospitalName: "",
    providerName: "",
    address: "",
    claimAmount: "",
    bankName: "",
    bankAccountNumber: "",
    ifscCode: "",
  };
  const [formData, setFormData] = useState(initialt_data);
  const [userEmail, setuserEmail] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    // console.log(userData?.data?.Client_details.firstName);
    if (userData?.data?.Client_details?.firstName) {
      try {
        await fetch(
          `https://full-tpa-management.onrender.com/claim/${userEmail}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            // console.log(data);
            if (data.success) {
              toast.success(data.message);
              setFormData(initialt_data);
              window.location.reload();
            } else {
              toast.error(data.message);
            }
          })
          .catch((e) => {
            // console.log(e);
          });
      } catch (error) {
        // console.log(error);

        toast.error("Failed to submit data");
      }
    } else {
      toast.info("please Add the client Details");
      setTimeout(() => {
        navigate("/addclient");
      }, 1500);
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("tocken");
    if (token) {
      setuserEmail(token);
    }
  }, []);
  if (userData?.data?.Claim_details?.name) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-2xl font-semibold text-blue-500 mt-4">
          Already Claim
        </p>
        <Link to="/claimstatus" className="underline mt-5">
          view
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h3 className="text-center text-2xl font-bold mb-6">Claim HERE</h3>
      <form onSubmit={submitData} className="grid gap-4">
        {[
          { label: "Name", name: "name" },
          { label: "Card ID", name: "cardId" },
          { label: "Policy Number", name: "policyNumber" },
          { label: "Insurance Company", name: "insuranceCompany" },
          { label: "Hospital Name", name: "hospitalName" },
          { label: "Provider Code", name: "providerName" },
          { label: "Claim Amount", name: "claimAmount", type: "number" },
          { label: "Bank Name", name: "bankName" },
          { label: "Bank Account Number", name: "bankAccountNumber" },
          { label: "IFSC Code", name: "ifscCode" },
        ].map(({ label, name, type = "text" }, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-semibold mb-2">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Claim;
