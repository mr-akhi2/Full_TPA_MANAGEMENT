import React, { useState } from "react";
import { toast } from "react-toastify";
import bg1 from "../images/bg5.jpg";
import bg2 from "../images/bg2.jpg";
import bg3 from "../images/bg3.jpg";
import bg4 from "../images/bg4.webp";

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
        "http://localhost:8080/uploadfile/sendresponse",
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
      <div className="w-full">
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll">
            {[bg4, bg1, bg3].map((image, index) => (
              <img
                key={index}
                src={image}
                className="w-full object-cover h-[300px] md:h-[500px]"
                alt="Slide"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-bold">OUR SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              img: bg2,
              title: "Broker & Agent",
              text: "Specialized insurance partner portals with real-time visibility.",
            },
            {
              img: bg3,
              title: "Government Business",
              text: "Assisting in implementing various Govt. schemes effectively.",
            },
            {
              img: bg1,
              title: "Insurer",
              text: "Collaboration with insurers to build strong tech infrastructure.",
            },
            {
              img: bg4,
              title: "Hospital",
              text: "12,000+ network hospitals & labs across 800+ cities in India.",
            },
            {
              img: bg3,
              title: "Insurance",
              text: "Advanced technology-backed infrastructure for insurers.",
            },
            {
              img: bg1,
              title: "Risk Management",
              text: "Helping businesses mitigate risks with cutting-edge solutions.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={service.img}
                className="w-full h-48 object-cover"
                alt={service.title}
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold">{service.title}</h5>
                <p className="text-gray-600 mt-2">{service.text}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Learn More
                </button>
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
        <p className="text-center max-w-3xl mx-auto mt-4 text-lg">
          Nurturing people lies at the core of our endeavors. Our team extends
          crucial support and aid to individuals facing unexpected and
          challenging situations.
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
        <p className="text-center text-gray-600 mt-4">© 2024 Company, Inc.</p>
      </footer>
    </>
  );
};

export default Home;
