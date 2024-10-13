import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import TeacherAbout from "../pages/About/Teacher/TeacherAbout";
import AuthLayout from "../layouts/AuthLayout";
import TeacherRegister from "../pages/Register/TeacherRegister";
import StudentRegister from "../pages/Register/StudentRegister";
import Login from "../pages/Login/Login";
import PrivateRoute from "../layouts/PrivateRoute";
import Teachers from "../pages/Teachers/Teachers";
import TeacherProfile from "../pages/Teachers/TeacherProfile";
import StudentProfile from "../pages/Student/StudentProfile";
import Tuitions from "../pages/Tuitions/Tuitions";
import EmailVerification from "../pages/Verification/EmailVerification";
import StudentProfileLayout from "../layouts/StudentProfileLayout";
import StudentTuitions from "../pages/Student/StudentTuitions";
import TuitionPostForm from "../pages/Student/TuitionPostForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/teachers",
        element: (
          <PrivateRoute>
            <Teachers />
          </PrivateRoute>
        ),
      },

      {
        path: "/:id",
        element: (
          <PrivateRoute>
            <TeacherAbout />
          </PrivateRoute>
        ),
      },
      {
        path: "teacher/:id",
        element: (
          <PrivateRoute>
            <TeacherProfile></TeacherProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/tuitions",
        element: (
          <PrivateRoute>
            <Tuitions />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-up/teacher",
        element: <TeacherRegister></TeacherRegister>,
      },
      {
        path: "sign-up/student",
        element: <StudentRegister></StudentRegister>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: `:id/verify/:token`,
        element: <EmailVerification />,
      },
    ],
  },
  {
    path: "/student-profile",
    element: <StudentProfileLayout />,
    children: [
      {
        path: ":id",
        element: <StudentTuitions></StudentTuitions>,
      },
      {
        path: "post/:id",
        element: <TuitionPostForm></TuitionPostForm>,
      },
    ],
  },
]);
