import React from "react";
import { NavLink } from "react-router-dom";

const GuestNavItems = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="main-btn rounded-md text-lg capitalize cursor-pointer">
        <NavLink to={`/auth/login`}>login</NavLink>
      </div>
      <div className="dropdown dropdown-hover dropdown-end">
        <div
          tabIndex={0}
          role="button "
          className=" m-1 main-btn-outline rounded-md text-lg capitalize cursor-pointer"
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
            <NavLink to={`/auth/sign-up/student`}>As a Student</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GuestNavItems;
