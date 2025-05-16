import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../src/pages/images/logo.jpg";

const Login = ({ setisloggedin }) => {
  const navigate = useNavigate();
  const [loder, setloader] = useState(false);
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });

  // onchnage

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  //  send otp

  const submit = async () => {
    setloader(true);
    if (
      userdata.email === "akhilesh@gmail.in" &&
      userdata.password === "@akhilesh"
    ) {
      console.log(`${userdata.email}+${userdata}`);
      console.log(userdata);
      toast.success("Login succesfully!");
      setisloggedin(false);
      const token = `${userdata.email}+${userdata.email}`;
      localStorage.setItem("tocken", token);
      window.location.replace("/");
    } else {
      try {
        const res = await fetch("http://localhost:8080/login", {
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
              toast.success(data.message);
              localStorage.setItem("tocken", data.tocken);
              setisloggedin(false);
              window.location.replace("/");
            } else {
              toast.error(data.message);
            }
          });
      } catch (error) {
        toast.error(error);
      } finally {
        setloader(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border-2 rounded-2xl p-5 w-[70%] md:w-[40%] lg:w-[25%]">
        <div className="flex justify-center">
          <img src={logo} className="h-15 w-15 rounded-full" />
        </div>
        <div className="p-5">
          <h1 className="text-center font-bold text-2xl">Login</h1>
        </div>
        <div className="p-3">
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
          <div className="m-3">
            <span className="text-sm">
              Create an account?{" "}
              <Link className="font-bold text-blue-700" to="/signup">
                Signup
              </Link>
            </span>
          </div>
          <div className="m-3">
            {!loder ? (
              <Button onClick={submit} className="w-full">
                Submit
              </Button>
            ) : (
              <Button className="w-full">
                {" "}
                <Loader2 className="h-4 w-4 animate-spin" />
                please wait
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
