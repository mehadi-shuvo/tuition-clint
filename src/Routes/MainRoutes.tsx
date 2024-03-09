import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import TeacherAbout from "../pages/About/Teacher/TeacherAbout";
import AuthLayout from "../layouts/AuthLayout";
import TeacherRegister from "../pages/Register/TeacherRegister";
import StudentRegister from "../pages/Register/StudentRegister";
import Login from "../pages/Login/Login";
import PrivateRoute from "../layouts/PrivateRoute";

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
        path: "/:id",
        element: (
          <PrivateRoute>
            <TeacherAbout />
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
    ],
  },
]);
