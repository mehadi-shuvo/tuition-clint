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
        element: <Teachers></Teachers>,
      },
      {
        path: "/teacher/:id",
        element: (
          <PrivateRoute>
            <TeacherProfile></TeacherProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/student/:id",
        element: <StudentProfile></StudentProfile>,
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
        path: "/tuitions",
        element: <Tuitions />,
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
    ],
  },
]);
