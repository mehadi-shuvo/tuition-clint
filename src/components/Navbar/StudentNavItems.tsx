import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const StudentNavItems = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = [
    {
      link: "/",
      name: "home",
    },
    {
      link: "/teachers",
      name: "Teachers",
    },
    {
      link: "/tuitions",
      name: "tuitions",
    },
    {
      link: `/student-profile/${id}`,
      name: "profile",
    },
  ];

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <div className="">
      {/* Navbar for  large device */}
      <div className="hidden lg:flex gap-5 items-center">
        {items.map((item) => (
          <li className="list-none capitalize" key={item.name}>
            <NavLink
              to={item.link}
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-[#00ccb1] text-lg font-medium"
                  : isPending
                  ? ""
                  : "transition-all ease-in delay-200 hover:text-[#00ccb1] text-lg font-medium"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
        <button
          onClick={logoutHandler}
          className="bg-[#00ccb1] hover:bg-[#258376] delay-300 ease-linear transition-all px-5 py-2 rounded-lg text-xl font-bold ml-20"
        >
          Logout
        </button>
      </div>
      {/* Navbar for small and medium  device*/}
      <div className="lg:hidden">
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="">
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
            className="shadow-white-xl navbar-bg fixed z-50 menu dropdown-content w-[200px] mt-6 rounded-b-md"
          >
            {items.map((item) => (
              <li className="list-none capitalize" key={item.link}>
                <NavLink
                  to={item.link}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-[#00ccb1] text-lg font-medium"
                      : isPending
                      ? ""
                      : "transition-all ease-in delay-200 hover:text-[#00ccb1] text-lg font-medium"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="mt-10 mb-5 w-full flex justify-center items-center list-none">
              <button
                onClick={logoutHandler}
                className="bg-[#00ccb1] hover:bg-[#258376] delay-300 ease-linear transition-all px-5 py-2 rounded-lg text-lg font-bold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentNavItems;
