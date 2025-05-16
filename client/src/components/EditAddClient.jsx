import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { UserContext } from "../pages/context/UserContext";

function EditAddClient() {
  const { userData } = useContext(UserContext);
  // console.log(userData);
  const initial = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address: "",
    currentAddress: "",
    city: "",
    pinCode: "",
    state: "",
    aadharNo: "",
    panCardNo: "",
    bankName: "",
    branchName: "",
    Accoutno: "",
    ifscCode: "",
  };
  const [formData, setFormData] = useState(initial);
  const [useremail, setUserEmail] = useState();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/client/${encodeURIComponent(useremail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setFormData(initial);
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const email = window.localStorage.getItem("tocken");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 mt-6 max-w-4xl">
      <h2 className="text-center text-2xl font-bold mb-6">
        Fill the Client Form
      </h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email", name: "email", type: "email" },
          { label: "Mobile No", name: "mobileNo" },
          { label: "Address", name: "address", full: true },
          { label: "Current Address", name: "currentAddress", full: true },
          { label: "City", name: "city" },
          { label: "Pin Code", name: "pinCode" },
          { label: "Aadhar No", name: "aadharNo" },
          { label: "Pan Card No", name: "panCardNo" },
          { label: "Account No", name: "Accoutno" },
          { label: "Bank Name", name: "bankName" },
          { label: "Branch Name", name: "branchName" },
          { label: "IFSC Code", name: "ifscCode" },
        ].map(({ label, name, type = "text", full }) => (
          <div
            className={`${full ? "col-span-1 sm:col-span-2" : ""}`}
            key={name}
          >
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
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose...</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Bihar">Bihar</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 w-full sm:w-auto"
          >
            Add Client
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAddClient;
