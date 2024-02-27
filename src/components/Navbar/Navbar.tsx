import { NavLink } from "react-router-dom";
import "../../App.css";

const Navbar = () => {
  return (
    <div className="navbar flex justify-center items-center shadow-white-xl navbar-bg fixed z-50">
      <div className=" flex items-center justify-between w-11/12">
        <div className="">
          <a className="text-3xl font-semibold text-white">LOGO</a>
        </div>
        <div className="flex items-center gap-5">
          <div className="main-btn rounded-md text-lg capitalize">login</div>
          <div className="dropdown dropdown-hover dropdown-end">
            <div
              tabIndex={0}
              role="button "
              className=" m-1 main-btn-outline rounded-md text-lg capitalize"
            >
              Sign Up
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow navbar-bg mt-2 w-52 "
            >
              <li className="border-b-2  rounded-sm hover:border-[#00ccb1] hover:text-[#00ccb1] text-lg font-medium">
                <NavLink to={`/auth/sign-up/teacher`}>As a Teacher</NavLink>
              </li>
              <li className="border-b-2  rounded-sm hover:border-[#00ccb1] hover:text-[#00ccb1] text-lg font-medium">
                <NavLink to={`/sign-up/student`}>As a Student</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
