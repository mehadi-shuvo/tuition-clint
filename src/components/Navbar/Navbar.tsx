import "../../App.css";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import GuestNavItems from "./GuestNavItems";
import StudentNavItems from "./StudentNavItems";
import TeacherNavItems from "./TeacherNavItems";

type TUser = {
  _id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

const Navbar = () => {
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  let navItems;
  console.log(user);
  if (!user) {
    navItems = <GuestNavItems />;
  } else {
    if ((user?.role as string) === "student") {
      navItems = <StudentNavItems />;
    } else {
      navItems = <TeacherNavItems _id={user._id} email={user.email} />;
    }
  }

  return (
    <div className="navbar flex justify-center items-center shadow-white-xl navbar-bg fixed z-50">
      <div className=" flex items-center justify-between w-11/12">
        <div className="">
          <a className="text-3xl font-semibold text-white">LOGO</a>
        </div>
        {navItems}
      </div>
    </div>
  );
};

export default Navbar;
