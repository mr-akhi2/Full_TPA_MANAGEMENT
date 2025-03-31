import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState(false);
  const [loder, setloader] = useState(false);
  const [varify, setVarify] = useState(false);
  const [resposnseOTP, setresposnseOTP] = useState();
  const [sendotp, setSendotp] = useState("Send OTP");
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    OTP: "",
  });

  // onchnage

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  //  send otp

  const sendOTP = async () => {
    setloader(true);
    try {
      await fetch("http://localhost:8080/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          // console.log(data);
          if (data.status) {
            setresposnseOTP(data.OTP);
            setotp(true);
            setloader(false);
            toast.success("otp send  successfully", data.OTP);
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      alert(error);
    } finally {
      setloader(false);
    }
  };

  // varify and saved

  const userHandler = async () => {
    const userOTP = userdata.OTP;
    setVarify(true);
    try {
      if (resposnseOTP === parseInt(userOTP)) {
        await fetch("http://localhost:8080/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdata),
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            // console.log(data);
            if (data.success) {
              toast.success("varify successfully!");
              toast.success(data.message);
              navigate("/login");
            }
          });
      } else {
        toast.error("enter the valid otp");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVarify(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 rounded-2xl p-5 w-[70%] md:w-[40%] lg:w-[25%]">
        <div className="p-5">
          <h1 className="text-center font-bold text-2xl">
            Crete a new account
          </h1>
        </div>
        <div className="p-3">
          <div className="m-3">
            <Input
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              value={userdata.name}
            />
          </div>
          <div className="m-3">
            <Input
              placeholder="Enter your Email"
              type="email"
              name="email"
              onChange={handleChange}
              value={userdata.email}
            />
          </div>
          <div className="m-3">
            <Input
              placeholder="Create your password"
              type="password"
              name="password"
              onChange={handleChange}
              value={userdata.password}
            />
          </div>
          {!otp ? (
            <div className="m-2 flex justify-end">
              {loder ? (
                <Button>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={sendOTP}>{sendotp}</Button>
              )}
            </div>
          ) : (
            <>
              <div className="m-3 flex justify-end">
                <Button onClick={sendOTP} variant="secondary">
                  Resend OTP
                </Button>
              </div>
              <div className="m-3">
                <Input
                  placeholder="Enter your OTP"
                  type="text"
                  name="OTP"
                  value={userdata.OTP}
                  onChange={handleChange}
                  maxLength="6"
                  className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="m-2 flex justify-center items-center w-full">
                {varify ? (
                  <Button className="w-full p-2">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button onClick={userHandler} className="w-full p-2">
                    Varify
                  </Button>
                )}
              </div>
            </>
          )}
          <div className="m-3">
            <span className="text-sm">
              Already have an account?{" "}
              <Link className="font-bold text-blue-700" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
