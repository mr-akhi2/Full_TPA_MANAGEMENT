import React, { useEffect, useRef, useState } from "react";

const Report = () => {
  const [Acco, setAcco] = useState("_______");
  const [data, setdata] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState("");

  const [surgery, setsurgery] = useState("_______");
  const [Problem, setproblem] = useState("_______");
  const [Hospital_name, setHospital_name] = useState("_______");
  const [address, setaddress] = useState("_______");
  const [DR_name, setDR_name] = useState("_______");
  const [Percentage, setPercentage] = useState("_______");
  const [Ammount, setAmmount] = useState("_______");
  const [regared, setregared] = useState("_______");

  function print() {
    let mainContent = document.querySelector(".Report_container").innerHTML;
    let printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>body { font-family: Arial, sans-serif; margin: 20px; }</style>
        </head>
        <body>
          ${mainContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  const Ac = useRef();
  const Dname = useRef();
  const regard = useRef();
  const Pername = useRef();
  const adress = useRef();
  const hname = useRef();
  const drname = useRef();
  const sname = useRef();
  const ammount = useRef();

  function submitInput() {
    setAcco(Ac.current.value);
    setproblem(selectedDisease);
    setregared(regard.current.value);
    setPercentage(Pername.current.value);
    setaddress(adress.current.value);
    setHospital_name(hname.current.value);
    setDR_name(drname.current.value);
    setsurgery(sname.current.value);
    setAmmount(ammount.current.value);
    document.getElementById("inpbx").style.display = "none";
    document.getElementById("header").style.display = "block";
  }

  useEffect(() => {
    const res = fetch("http://localhost:8080/uploadFile/getallname")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log(data);
        setdata(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <div className="flex flex-col items-center p-4">
      <div
        id="header"
        className="hidden w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg"
      >
        <div className="Report_container text-center">
          <h2 className="text-2xl font-bold">Health Insurance Claim Letter</h2>
          <b className="block mt-2">To Claim Manager</b>
          <h4 className="mt-2 font-semibold">Good Day!</h4>
          <p className="mt-2 text-justify">
            This letter is in regards to the medical insurance <b>{Acco}</b>{" "}
            that I hold with your insurance company. I would like to request a
            claim for the medical expenses that I incurred owing to my medical
            treatment.
          </p>
          <p className="mt-2 text-justify">
            Recently I had a <b>{Problem}.</b> problem which required{" "}
            <b>{surgery}</b>. I was admitted to <b>{Hospital_name}</b> which is
            located at <b>{address}</b>. My surgeon was <b>{DR_name}</b>. As per
            the Insurance Policy, I can claim <b>{Percentage}</b> of the medical
            expenses. The total bill came out to be <b>{Ammount}</b>.
          </p>
          <p className="mt-2 text-justify">
            I would request you to consider my appeal at the earliest. Please
            find enclosed the relevant documents for your reference. Kindly let
            me know if you require any other documents.
          </p>
          <h4 className="mt-4 font-semibold">Regards,</h4>
          <i className="block mt-1">{regared}</i>
        </div>
        <button
          onClick={print}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print
        </button>
      </div>

      <div
        id="inpbx"
        className="w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <h1 className="text-xl font-bold text-center">Fill the Forms</h1>
        <input
          ref={Ac}
          type="text"
          placeholder="Enter your Account number"
          className="w-full p-2 mt-3 border rounded"
        />
        <select
          className="w-full mt-2 border-2 border-gray-300  h-10 rounded-sm"
          value={selectedDisease}
          onChange={(e) => setSelectedDisease(e.target.value)}
        >
          <option value="" disabled selected>
            select disease_name
          </option>
          {data.map((item, index) => {
            return (
              <option value={item.disease_name} key={index}>
                {item.disease_name}
                {item.price}
              </option>
            );
          })}
        </select>
        <input
          ref={sname}
          type="text"
          placeholder="Enter your surgery"
          className="w-full p-2 mt-3 border rounded"
        />
        <input
          ref={hname}
          type="text"
          placeholder="Enter your Hospital Name"
          className="w-full p-2 mt-3 border rounded"
        />
        <input
          ref={adress}
          type="text"
          placeholder="Enter your address"
          className="w-full p-2 mt-3 border rounded"
        />
        <input
          ref={drname}
          type="text"
          placeholder="Enter your Doctor's Name"
          className="w-full p-2 mt-3 border rounded"
        />
        <input
          ref={Pername}
          type="text"
          placeholder="Enter Percentage"
          className="w-full p-2 mt-3 border rounded"
        />
        <input
          ref={ammount}
          type="text"
          placeholder="Enter Amount"
          className="w-full p-2 mt-3 border rounded"
        />
        <input
          ref={regard}
          type="text"
          placeholder="Enter your Name"
          className="w-full p-2 mt-3 border rounded"
        />
        <button
          onClick={submitInput}
          className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Report;
