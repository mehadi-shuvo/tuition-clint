import React from "react";
import "./../App.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-bg text-white">
      {/* =================navbar================== */}
      <Navbar />
      {/* =====================body===================== */}
      <div className="pb-20">
        <Outlet></Outlet>
      </div>
      {/* =====================Footer===================== */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
