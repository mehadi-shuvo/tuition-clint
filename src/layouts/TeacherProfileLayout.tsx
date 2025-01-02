import { Navigate, NavLink, Outlet, useParams } from "react-router-dom";
import { useGetOneTeacherBYIdQuery } from "../redux/features/teacher/teacherApi";
import { useAppDispatch } from "../redux/hooks";
import { watchLoader } from "../utils/loader";
import { logOut } from "../redux/features/auth/authSlice";
import { BackgroundGradientRound } from "../components/ui/round-gradient";

const TeacherProfileLayout = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const { data: teacher, isLoading } = useGetOneTeacherBYIdQuery(id as string);
  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  const {
    name,
    university,
    whatsApp,
    classRange,
    description,
    photo,
    studentIDPhoto,
    subjects,
  } = teacher?.data;
  console.log(teacher);

  const show = [];
  for (let i = 0; i < subjects.length; i++) {
    if (i == subjects.length - 1) {
      show.push(subjects[i]);
    } else {
      show.push(subjects[i] + " |");
    }
  }

  const logoutHandler = () => {
    dispatch(logOut());
    return <Navigate to="/" replace={true} />;
  };

  return (
    <div className="drawer lg:drawer-open text-white main-bg">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* for mobile nav */}
        <div className="lg:hidden navbar flex  shadow-white-xl navbar-bg fixed top-0 left-0 z-50 ">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button cursor-pointer mr-24"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <a className="text-3xl font-semibold text-white">LOGO</a>
        </div>
        <div className="w-full">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className=" drawer-overlay"
        ></label>
        <div className="menu text-base-content min-h-full w-3/5 md:w-80 p-4 secondary-bg px-0">
          <div className="relative z-10 flex justify-center items-center pt-14 lg:pt-8">
            <BackgroundGradientRound>
              <img
                className="z-10 size-24 rounded-full mx-auto"
                src={teacher.data.photo}
                alt=""
              />
            </BackgroundGradientRound>
          </div>

          <h1 className="text-xl font-medium uppercase secondary-font text-center mt-3">
            {teacher.data.name}
          </h1>
          <h1 className="text-sm text-center font-normal text-[#00ccb1] capitalize">
            {teacher.data.schoolOrCollage}
          </h1>

          <div className="my-5 text-lg md:text-xl font-normal md:font-medium flex flex-col gap-2 text-center capitalize pb-14 lg:pb-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "profile-active-nav" : "text-white profile-nav"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={`/student-profile/${"user?._id"}`}
              className={({ isActive }) =>
                isActive ? "profile-active-nav" : "text-white profile-nav"
              }
            >
              profile
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive ? "profile-active-nav" : "text-white profile-nav"
              }
            >
              Tutors
            </NavLink>

            <NavLink
              to={`/student-profile/post/${"user?._id"}`}
              className={({ isActive }) =>
                isActive ? "profile-active-nav" : "text-white profile-nav"
              }
            >
              Post Tuition
            </NavLink>
          </div>

          <div className="fixed left-0 bottom-0 w-full">
            <button
              onClick={logoutHandler}
              className="bg-[#258376] block w-full hover:bg-[#2583778f] delay-300 ease-linear transition-all px-5 py-2 text-xl font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileLayout;
