import "../App.css";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="main-font">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
