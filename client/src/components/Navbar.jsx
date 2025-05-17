import { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Menu, X } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../pages/images/logo.jpg";
import Home from "../pages/Home/Home";
import Report from "./ReportG";
import Login from "./Login";
import Signup from "./Signup";
import EditAddClient from "./EditAddClient";
import {
  ProtectedRoute,
  ProtectedAdminRoute,
} from "../pages/ProtectedRout/Protected";

import AddClient from "./AddClient";
import Billing from "./billing";
import Claim from "./Claim";
import Client from "./Client";
import Claimstatus from "./Claimstatus";
import { Button } from "./ui/button";
import { IoIosNotifications } from "react-icons/io";

import DashBoard from "./DashBoard";
import { UserContext } from "../pages/context/UserContext";
import { toast } from "react-toastify";
import profile from "../pages/images/profile.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Upload from "./Upload";
import Request from "./Request";
import Doctor from "./Doctor";
import TrackStatus from "./TrackStatus";

export default function Navbar() {
  const { userData } = useContext(UserContext);
  const { admin } = useContext(UserContext);
  // console.log(userData);
  // console.log(userData?.data?.name);

  const [isOpen, setIsOpen] = useState(false);

  const [isloggedin, setisloggedin] = useState(false);

  // deleteAccountHandler

  const deleteAccountHandler = async (email) => {
    // console.log(email);
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await fetch(
          `https://full-tpa-management.onrender.com/deleteAccount/${email}`,
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
              window.localStorage.removeItem("tocken");
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

        toast.error("Failed to submit data");
      }
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("tocken");
    if (token) {
      return setisloggedin(true);
    }
  }, []);
  return (
    <div>
      {
        <nav className="bg-gray-800 text-white p-1">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              <img
                src={logo}
                alt="img_logo"
                className="h-20 w-20 rounded-full"
              />
            </Link>
            {!isloggedin && (
              <div className="flex items-center justify-around gap-6 me-1">
                <p className="text-2xl md:text-3xl">
                  Third Party Administrator
                </p>
                <Link
                  to="/doctor"
                  className="text-md md:text-2xl mt-2 ms-2 font-semibold"
                >
                  Upload
                </Link>
                <Link
                  to="/track"
                  className="text-md font-semibold md:text-2xl mt-2 ms-2"
                >
                  Track status
                </Link>
              </div>
            )}

            {/* Desktop Menu */}

            {admin ? (
              <div>
                {isloggedin ? (
                  <div className="hidden md:flex space-x-7">
                    <Link
                      to="/userinfo"
                      className="block no-underline hover:text-gray-400"
                      id="cross"
                      style={{ textDecoration: "none" }}
                    >
                      User Info
                    </Link>
                    <Link
                      to="/dashboarddetails"
                      className="block no-underline hover:text-gray-400"
                      style={{ textDecoration: "none" }}
                    >
                      Dashboard
                    </Link>
                    <Dialog className="cursor-pointer">
                      <DialogTrigger className="h-10 w-10">
                        <img src={profile} alt="profile" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center flex flex-col items-center p-2">
                            <img
                              src={profile}
                              alt="profile"
                              className="h-10 w-10"
                            />
                            <h1 className="pt-3">Your Profile</h1>
                          </DialogTitle>
                          <DialogDescription>
                            <div>
                              <div className="text-center m-2 text-black text-xl font-semibold">
                                <h1>{userData?.data?.name}</h1>
                              </div>
                              <div className="text-center m-2 text-black text-xl font-semibold">
                                <h1>{userData?.data?.email}</h1>
                              </div>
                            </div>
                            <div className="text-center mt-5 flex justify-center">
                              <Button
                                onClick={() => {
                                  window.localStorage.removeItem("tocken");
                                  window.location.replace("/");
                                  setisloggedin(false);
                                  toast.success("successfully logout");
                                }}
                                className=" font-bold w-20"
                                variant="destructive"
                              >
                                Logout
                              </Button>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/addclient"
                  className="block no-underline hover:text-gray-400"
                  style={{ textDecoration: "none" }}
                >
                  Addclient
                </Link>
                <Link
                  to="/claim"
                  className="block no-underline hover:text-gray-400"
                  style={{ textDecoration: "none" }}
                >
                  Claim_Details
                </Link>
                <Link
                  to="/claimstatus"
                  className="block no-underline hover:text-gray-400"
                  style={{ textDecoration: "none" }}
                >
                  Claimstatus
                </Link>
                <Link
                  to="/report"
                  className="block no-underline hover:text-gray-400"
                  style={{ textDecoration: "none" }}
                >
                  Generate Report
                </Link>
                <Link
                  to="/upload"
                  className="block no-underline hover:text-gray-400"
                  style={{ textDecoration: "none" }}
                >
                  Upload Report
                </Link>
                <div className="text-2xl mt-1 cursor-pointer">
                  {userData?.data?.Claim_details?.notification && (
                    <span className="text-sm text-red-500 relative top-[-50%] left-6 font-bold">
                      1
                    </span>
                  )}
                  <Dialog>
                    <DialogTrigger>
                      <IoIosNotifications />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center flex flex-col items-center p-2">
                          {userData?.data?.Claim_details?.notification && (
                            <>
                              <img
                                src={profile}
                                alt="profile"
                                className="h-10 w-10"
                              />
                              <h1 className="pt-3">
                                The message was sent from ************@gmail.com
                              </h1>
                            </>
                          )}
                        </DialogTitle>
                        <DialogDescription className="text-black text-center text-md">
                          {userData?.data?.Claim_details?.notification ||
                            "not message yet"}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>

                {admin && (
                  <>
                    <Link
                      to="/userinfo"
                      className="block no-underline hover:text-gray-400"
                      style={{ textDecoration: "none" }}
                    >
                      UserINFo
                    </Link>
                    <Link
                      to="/dashboarddetails"
                      className="block no-underline hover:text-gray-400"
                      style={{ textDecoration: "none" }}
                    >
                      DashBoard
                    </Link>
                  </>
                )}
                {isloggedin ? (
                  <Dialog>
                    <DialogTrigger className="h-10 w-10">
                      <img src={profile} alt="profile" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center flex flex-col items-center p-2">
                          <img
                            src={profile}
                            alt="profile"
                            className="h-10 w-10"
                          />
                          <h1 className="pt-3">Your Profile</h1>
                        </DialogTitle>
                        <DialogDescription>
                          <div>
                            <div className="text-center m-2 text-black text-xl font-semibold">
                              <h1>{userData?.data?.name}</h1>
                            </div>
                            <div className="text-center m-2 text-black text-xl font-semibold">
                              <h1>{userData?.data?.email}</h1>
                            </div>
                          </div>
                          <div className="text-center mt-5 flex justify-between">
                            <Button
                              onClick={() => {
                                window.localStorage.removeItem("tocken");
                                window.location.replace("/");
                                setisloggedin(false);
                                toast.success("successfully logout");
                              }}
                              className=" font-bold w-20"
                              variant="destructive"
                            >
                              Logout
                            </Button>
                            <Button
                              className=" font-bold w-40"
                              onClick={() =>
                                deleteAccountHandler(userData?.data?.email)
                              }
                            >
                              Delete Account
                            </Button>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Link
                    to="/login"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            {isloggedin ? (
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            ) : (
              <></>
            )}
          </div>
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 space-y-2 text-center bg-gray-700 p-4 rounded-lg">
              {admin ? (
                <>
                  <Link
                    to="/userinfo"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    User Info
                  </Link>
                  <Link
                    to="/dashboarddetails"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    Dashboard
                  </Link>
                  <div className="text-3xl flex justify-center">
                    <Dialog>
                      <DialogTrigger className="h-10 w-10">
                        <img src={profile} alt="profile" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center flex flex-col items-center p-2">
                            <img
                              src={profile}
                              alt="profile"
                              className="h-10 w-10"
                            />
                            <h1 className="pt-3">Your Profile</h1>
                          </DialogTitle>
                          <DialogDescription>
                            <div>
                              <div className="text-center m-2 text-black text-xl font-semibold">
                                <h1>{userData?.data?.name}</h1>
                              </div>
                              <div className="text-center m-2 text-black text-xl font-semibold">
                                <h1>{userData?.data?.email}</h1>
                              </div>
                            </div>
                            <div className="text-center mt-5 flex justify-center">
                              <Button
                                onClick={() => {
                                  window.localStorage.removeItem("tocken");
                                  window.location.replace("/");
                                  setisloggedin(false);
                                  toast.success("successfully logout");
                                }}
                                className=" font-bold w-20"
                                variant="destructive"
                              >
                                Logout
                              </Button>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/addclient"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    Add Client
                  </Link>
                  <Link
                    to="/claim"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    Claim
                  </Link>
                  <Link
                    to="/claimstatus"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    Claim Status
                  </Link>
                  <Link
                    to="/report"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    Generate Report
                  </Link>
                  <Link
                    to="/upload"
                    className="block no-underline hover:text-gray-400"
                    style={{ textDecoration: "none" }}
                  >
                    Upload Report
                  </Link>

                  <div className="text-2xl mt-1">
                    <Dialog>
                      <DialogTrigger>
                        {userData?.data?.Claim_details?.notification && (
                          <span className="text-sm relative top-5 left-2 text-red-500 font-bold">
                            1
                          </span>
                        )}
                        <IoIosNotifications className="font-2xl" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center flex flex-col items-center p-2">
                            {userData?.data?.Claim_details?.notification && (
                              <>
                                <img
                                  src={profile}
                                  alt="profile"
                                  className="h-10 w-10"
                                />
                                <h1 className="pt-3">
                                  The message was sent from
                                  ************@gmail.com
                                </h1>
                              </>
                            )}
                          </DialogTitle>
                          <DialogDescription className="text-black text-center text-md">
                            {userData?.data?.Claim_details?.notification ||
                              "not message yet"}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {isloggedin ? (
                    <Dialog>
                      <DialogTrigger className="h-10 w-10">
                        <img src={profile} alt="profile" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center flex flex-col items-center p-2">
                            <img
                              src={profile}
                              alt="profile"
                              className="h-10 w-10"
                            />
                            <h1 className="pt-3">Your Profile</h1>
                          </DialogTitle>
                          <DialogDescription>
                            <div>
                              <div className="text-center m-2 text-black text-xl font-semibold">
                                <h1>{userData?.data?.name}</h1>
                              </div>
                              <div className="text-center m-2 text-black text-xl font-semibold">
                                <h1>{userData?.data?.email}</h1>
                              </div>
                            </div>
                            <div className="text-center mt-5 flex justify-between">
                              <Button
                                onClick={() => {
                                  window.localStorage.removeItem("tocken");
                                  window.location.replace("/");
                                  setisloggedin(false);
                                  toast.success("Successfully logged out");
                                }}
                                className="font-bold w-20"
                                variant="destructive"
                              >
                                Logout
                              </Button>
                              <Button
                                className="font-bold w-40"
                                onClick={() =>
                                  deleteAccountHandler(userData?.data?.email)
                                }
                              >
                                Delete Account
                              </Button>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Link
                      to="/login"
                      className="block no-underline hover:text-gray-400"
                      style={{ textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
        </nav>
      }
      {/* mini container */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/track" element={<TrackStatus />} />
        <Route
          path="/login"
          element={<Login setisloggedin={setisloggedin} />}
        />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/dashboarddetails" element={<DashBoard />} />
          <Route path="/userinfo" element={<Client />} />
        </Route>

        {/* protectRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/addclient" element={<AddClient />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/claimstatus" element={<Claimstatus />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/report" element={<Report />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/editclient" element={<EditAddClient />} />
        </Route>
      </Routes>
    </div>
  );
}
