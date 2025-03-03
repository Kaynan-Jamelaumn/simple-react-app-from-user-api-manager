import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
      <ProtectedRoute pageName="Profile"> <Profile /></ProtectedRoute>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;