import "./../App.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="main-bg text-white main-font">
      {/* =================navbar================== */}
      <Navbar />
      {/* =====================body===================== */}
      <div className="pb-20">
        <Outlet></Outlet>
      </div>
      {/* =====================Footer===================== */}
      <div className="-mb-2">
        <svg
          id="wave"
          viewBox="0 0 1440 300"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(0, 204, 177, 0.21)" offset="0%"></stop>
              <stop
                stopColor="rgba(204.004, 244.034, 235.218, 1)"
                offset="100%"
              ></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient-0)"
            d="M0,270L80,250C160,230,320,190,480,185C640,180,800,210,960,225C1120,240,1280,240,1440,205C1600,170,1760,100,1920,100C2080,100,2240,170,2400,190C2560,210,2720,180,2880,155C3040,130,3200,110,3360,95C3520,80,3680,70,3840,70C4000,70,4160,80,4320,75C4480,70,4640,50,4800,70C4960,90,5120,150,5280,165C5440,180,5600,150,5760,115C5920,80,6080,40,6240,60C6400,80,6560,160,6720,190C6880,220,7040,200,7200,205C7360,210,7520,240,7680,240C7840,240,8000,210,8160,210C8320,210,8480,240,8640,215C8800,190,8960,110,9120,80C9280,50,9440,70,9600,70C9760,70,9920,50,10080,65C10240,80,10400,130,10560,125C10720,120,10880,60,11040,35C11200,10,11360,20,11440,25L11520,30L11520,300L11440,300C11360,300,11200,300,11040,300C10880,300,10720,300,10560,300C10400,300,10240,300,10080,300C9920,300,9760,300,9600,300C9440,300,9280,300,9120,300C8960,300,8800,300,8640,300C8480,300,8320,300,8160,300C8000,300,7840,300,7680,300C7520,300,7360,300,7200,300C7040,300,6880,300,6720,300C6560,300,6400,300,6240,300C6080,300,5920,300,5760,300C5600,300,5440,300,5280,300C5120,300,4960,300,4800,300C4640,300,4480,300,4320,300C4160,300,4000,300,3840,300C3680,300,3520,300,3360,300C3200,300,3040,300,2880,300C2720,300,2560,300,2400,300C2240,300,2080,300,1920,300C1760,300,1600,300,1440,300C1280,300,1120,300,960,300C800,300,640,300,480,300C320,300,160,300,80,300L0,300Z"
          ></path>
          <defs>
            <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(0, 204, 177, 1)" offset="0%"></stop>
              <stop stopColor="rgba(255, 255, 255, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient-1)"
            d="M0,150L80,165C160,180,320,210,480,230C640,250,800,260,960,230C1120,200,1280,130,1440,110C1600,90,1760,120,1920,125C2080,130,2240,110,2400,120C2560,130,2720,170,2880,170C3040,170,3200,130,3360,120C3520,110,3680,130,3840,140C4000,150,4160,150,4320,150C4480,150,4640,150,4800,140C4960,130,5120,110,5280,125C5440,140,5600,190,5760,210C5920,230,6080,220,6240,185C6400,150,6560,90,6720,100C6880,110,7040,190,7200,220C7360,250,7520,230,7680,190C7840,150,8000,90,8160,100C8320,110,8480,190,8640,205C8800,220,8960,170,9120,125C9280,80,9440,40,9600,35C9760,30,9920,60,10080,75C10240,90,10400,90,10560,110C10720,130,10880,170,11040,155C11200,140,11360,70,11440,35L11520,0L11520,300L11440,300C11360,300,11200,300,11040,300C10880,300,10720,300,10560,300C10400,300,10240,300,10080,300C9920,300,9760,300,9600,300C9440,300,9280,300,9120,300C8960,300,8800,300,8640,300C8480,300,8320,300,8160,300C8000,300,7840,300,7680,300C7520,300,7360,300,7200,300C7040,300,6880,300,6720,300C6560,300,6400,300,6240,300C6080,300,5920,300,5760,300C5600,300,5440,300,5280,300C5120,300,4960,300,4800,300C4640,300,4480,300,4320,300C4160,300,4000,300,3840,300C3680,300,3520,300,3360,300C3200,300,3040,300,2880,300C2720,300,2560,300,2400,300C2240,300,2080,300,1920,300C1760,300,1600,300,1440,300C1280,300,1120,300,960,300C800,300,640,300,480,300C320,300,160,300,80,300L0,300Z"
          ></path>
        </svg>
      </div>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
