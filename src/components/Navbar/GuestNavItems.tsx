import { NavLink } from "react-router-dom";

const GuestNavItems = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="hidden lg:block main-btn rounded-md text-lg capitalize cursor-pointer">
        <NavLink to={`/auth/login`}>login</NavLink>
      </div>
      <div className="dropdown dropdown-hover dropdown-end hidden lg:block">
        <div
          tabIndex={0}
          role="button "
          className=" m-1 main-btn-outline rounded-md text-lg capitalize cursor-pointer "
        >
          SignUp
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow navbar-bg mt-2 w-52 "
        >
          <li className="border-b-2  rounded-sm hover:border-[#00ccb1] hover:text-[#00ccb1] text-lg font-medium">
            <NavLink to={`/auth/sign-up/teacher`}>Register As Teacher</NavLink>
          </li>
          <li className="border-b-2  rounded-sm hover:border-[#00ccb1] hover:text-[#00ccb1] text-lg font-medium">
            <NavLink to={`/auth/sign-up/student`}>Register As Student</NavLink>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-hover dropdown-end lg:hidden">
        <div
          tabIndex={0}
          role="button "
          className=" m-1 rounded-md text-lg capitalize cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow navbar-bg mt-2 w-52 "
        >
          <li className="border-b-2  rounded-sm hover:border-[#00ccb1] hover:text-[#00ccb1] text-lg font-medium">
            <NavLink to={`/auth/sign-up/teacher`}>Register As Teacher</NavLink>
          </li>
          <li className="border-b-2  rounded-sm hover:border-[#00ccb1] hover:text-[#00ccb1] text-lg font-medium">
            <NavLink to={`/auth/sign-up/student`}>Register As Student</NavLink>
          </li>
          <div className="main-btn lg:hidden rounded-md text-lg capitalize cursor-pointer mt-5 text-center">
            <NavLink to={`/auth/login`}>login</NavLink>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default GuestNavItems;
