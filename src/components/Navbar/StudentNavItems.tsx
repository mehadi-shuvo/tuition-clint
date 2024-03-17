import { NavLink } from "react-router-dom";

const StudentNavItems = () => {
  const logoutHandler = () => {
    console.log("1");
  };
  return (
    <ul className="flex items-center gap-5">
      <li className=" ">
        <NavLink
          to={`/`}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#00ccb1] text-lg font-medium"
              : isPending
              ? ""
              : "transition-all ease-in delay-200 hover:text-[#00ccb1] text-lg font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/teachers`}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#00ccb1] text-lg font-medium"
              : isPending
              ? ""
              : "transition-all ease-in delay-200 hover:text-[#00ccb1] text-lg font-medium"
          }
        >
          Teachers
        </NavLink>
      </li>
      <li
        onClick={() => logoutHandler()}
        className="ml-10 main-btn rounded-md text-lg capitalize cursor-pointer"
      >
        Logout
      </li>
    </ul>
  );
};

export default StudentNavItems;
