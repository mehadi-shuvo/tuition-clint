import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BackgroundGradientRound } from "../components/ui/round-gradient";
import { TUser } from "../pages/Home/types";
import { logOut, useAuthCurrentUser } from "../redux/features/auth/authSlice";
import {
  useGetOneStudentByIdQuery,
  useUpdateStudentProfileMutation,
} from "../redux/features/student/studentApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { watchLoader } from "../utils/loader";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  schoolOrCollage: string;
  photo: string;
  whatsApp: string;
};

const StudentProfileLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const [updateStudent, { isLoading: isUploading }] =
    useUpdateStudentProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let validData: { [key: string]: string } = { id: student.data._id };
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        validData[key] = value;
      }
    }
    console.log(validData);

    await updateStudent(validData);
    window.location.reload();
  };

  const { isLoading, data: student } = useGetOneStudentByIdQuery(user?.email);
  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }
  // console.log(student);

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/");
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
          <div
            className={`${
              isModalOpen ? "block" : "hidden"
            } w-4/5 mx-auto mt-16`}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-10">
                <label>
                  <p>Name</p>
                  <input
                    className="bg-transparent border-b-2 border-[#444] w-full focus:outline-none"
                    placeholder={student.data.name}
                    {...register("name")}
                  />
                </label>
                <label>
                  <p>School/College</p>
                  <input
                    className="bg-transparent border-b-2 border-[#444] w-full focus:outline-none"
                    placeholder={student.data.schoolOrCollage}
                    {...register("schoolOrCollage")}
                  />
                </label>
                <label>
                  <p>WhatsApp</p>
                  <input
                    className="bg-transparent border-b-2 border-[#444] w-full focus:outline-none"
                    placeholder={student.data.whatsApp}
                    {...register("whatsApp")}
                  />
                </label>
                <label>
                  <p>Photo</p>
                  <input
                    type="text"
                    className="bg-transparent border-b-2 border-[#444] w-full file:bg-transparent file:border-none file:border-[#444] file:text-white file:text-start focus:outline-none"
                    {...register("photo")}
                  />
                </label>

                <input type="submit" value="update" />
              </div>
            </form>
          </div>
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
                src={student.data.photo}
                alt=""
              />
            </BackgroundGradientRound>
            <div
              className="absolute -bottom-2 right-8 md:right-20 bg-[#3333336e] rounded-full p-3 z-20 cursor-pointer text-white hover:text-[#00ccb1] transition-all delay-300 ease-linear"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-xl font-medium uppercase secondary-font text-center mt-3">
            {student.data.name}
          </h1>
          <h1 className="text-sm text-center font-normal text-[#00ccb1] capitalize">
            {student.data.schoolOrCollage}
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
              to={`/student-profile/${user?._id}`}
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
              to={`/student-profile/post/${user?._id}`}
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

export default StudentProfileLayout;
