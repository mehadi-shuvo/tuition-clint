import { NavLink } from "react-router-dom";

const TeacherNavItems = ({ _id, email }: { _id: string; email: string }) => {
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
      <li>
        <NavLink
          to={`/teacher/${_id}`}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#00ccb1] text-lg font-medium"
              : isPending
              ? ""
              : "transition-all ease-in delay-200 hover:text-[#00ccb1] text-lg font-medium"
          }
        >
          Profile
        </NavLink>
      </li>
    </ul>
  );
};

export default TeacherNavItems;
