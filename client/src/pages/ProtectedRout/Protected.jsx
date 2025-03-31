import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function ProtectedRoute() {
  const token = window.localStorage.getItem("tocken");
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export function ProtectedAdminRoute() {
  const { userData } = useContext(UserContext);
  const token = window.localStorage.getItem("tocken");
  return !userData && token ? <Outlet /> : <Navigate to="/" />;
}
