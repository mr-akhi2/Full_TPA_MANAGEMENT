import React, { useState } from "react";
import { toast } from "react-toastify";
import bg1 from "../images/bg5.jpg";
import bg2 from "../images/bg2.jpg";
import login_bg from "../images/login_bg.jpg";
import bg4 from "../images/bg4.webp";
import tpa_background from "../images/tpa_background.png";
import claim_img from "../images/claim_img.png";
import support_img from "../images/24.png";
import insurers from "../images/insures.png";
import mainImg from "../images/main.png";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    text: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitDetails = async () => {
    const { name, email, subject, text } = formData;

    if (!name || !email || !subject || !text) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch(
        "https://full-tpa-management.onrender.com/uploadfile/sendresponse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      toast.error("Failed to send, try again!");
    }
  };

  return (
    <>
      {/* Carousel */}
      {/* <div className="w-full overflow-hidden">
        <div className="flex animate-scroll hover:pause">
          {[mainImg].map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-full h-[300px] md:h-[500px] object-cover"
              alt="Slide"
            />
          ))}
        </div>
      </div> */}
      <div className="flex items-center justify-center m-20">
        <img src={mainImg} className="w-full" />
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-10">
        <p className="text-center text-4xl font-bold">Functions of TPA Desk</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              img: claim_img,
              title: "Claim Settlement",
              text: "The Primary Function of the hospital TPA Desk revolves around verifying your medical insurance coverage and assisting with the cliam process.",
            },
            {
              img: support_img,
              title: "24*7 Helpline",
              text: "The TPA in hostpital insurance desk also operate as a  round the_clock helpline,available to assist you time you require support ",
            },
            {
              img: insurers,
              title: "Reporting to Insurers",
              text: "Provide regular reports and analytics to insurance companies.Help insurers in policy management and cost control.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={service.img}
                className="w-full h-80 object-fit pt-5"
                alt={service.title}
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold">{service.title}</h5>
                <p className="text-gray-600 text-lg mt-2">{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-bold">OUR SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              img: tpa_background,
              title: "Claims Processing",
              text: "We handle the entire claims process—from document verification to settlement—ensuring a smooth and transparent experience for policyholders. Our system supports both cashless and reimbursement claims with real-time tracking and fraud prevention measures..",
            },
            {
              img: bg2,
              title: "Policyholder Services",
              text: "From seamless member enrollment to ID card issuance and policy modifications, we ensure efficient policy administration tailored to both group and individual plans.",
            },
            {
              img: bg1,
              title: "Hospital Network Management",
              text: "We build and manage a robust network of empaneled hospitals, negotiate treatment tariffs, and maintain service quality through regular audits and feedback systems.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={service.img}
                className="w-full h-80 object-fit pt-5"
                alt={service.title}
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold">{service.title}</h5>
                <p className="text-gray-600 text-lg mt-2">{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-gray-800 text-white py-10 px-6">
        <h2 className="text-center text-3xl font-semibold underline">
          About Us
        </h2>
        <p className="text-center max-w-3xl mx-auto mt-4 text-2xl">
          we specialize in seamless and efficient Third Party Administrator
          (TPA) management solutions. Our platform is designed to simplify
          healthcare claim processing, policy management, and communication
          between insurers, hospitals, and policyholders. With a focus on
          transparency, speed, and compliance, we empower insurance companies
          and TPAs to handle large volumes of claims, track policy details,
          manage provider networks, and ensure accurate settlements — all
          through one centralized system.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-bold underline">Contact Us</h2>
        <div className="max-w-2xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            <button
              onClick={submitDetails}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 mt-10">
        <ul className="flex justify-center space-x-6">
          {["Home", "Features", "Pricing", "FAQs", "About"].map(
            (item, index) => (
              <li key={index}>
                <a href="#" className="text-gray-600 hover:text-blue-500">
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
        <p className="text-center text-gray-600 mt-4">24*7 our services</p>
        <p className="text-center text-gray-600 mt-4">
          Query: <a className="cursor-pointer">tpamangement2024@gmail.com</a>
        </p>
        <p className="text-center text-gray-600 mt-4">© 2024 Company, Inc.</p>
      </footer>
    </>
  );
};

export default Home;
