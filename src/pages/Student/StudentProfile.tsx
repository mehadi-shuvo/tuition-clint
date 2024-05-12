import { BackgroundBeamsDemo } from "../../components/BackgroundBeams/BackgroundBeamsDemo";
import { BackgroundGradientRound } from "../../components/ui/round-gradient";
import {
  Education,
  emailSVG,
  phoneOutlineSVG,
} from "../../assets/svgs/localSVGs";

import "../../App.css";
import { useGetOneStudentByIdQuery } from "../../redux/features/student/studentApi";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../Home/types";
import { watchLoader } from "../../utils/loader";
import StudentTuitions from "./StudentTuitions";
import TuitionPostForm from "./TuitionPostForm";
const StudentProfile = () => {
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const { isLoading, data: student } = useGetOneStudentByIdQuery(user?.email);
  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  return (
    <div>
      <BackgroundBeamsDemo />
      <div className="relative z-10 flex justify-start items-center pb-10 -mt-[100px] w-4/5 mx-auto">
        <BackgroundGradientRound>
          <img
            className="z-10 size-40 rounded-full mx-auto"
            src={student.data.photo}
            alt=""
          />
        </BackgroundGradientRound>
      </div>
      <div className="w-4/5 mx-auto grid md:grid-cols-2 gap-10 md:gap-0">
        <div>
          <h1 className="text-2xl font-bold uppercase secondary-font">
            {student.data.name}
          </h1>
          <h1 className="text-lg font-normal text-[#00ccb1] uppercase flex gap-3">
            {Education} {student.data.schoolOrCollage}
          </h1>
          <div className="mt-4">
            <p className="flex gap-4 italic text-base">
              {emailSVG} {student.data.email} hello
            </p>
            <p className="flex gap-4 italic text-base mt-3">
              {phoneOutlineSVG} {student.data.whatsApp}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-2xl md:text-4xl secondary-font uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#00ccb1] to-pink-500">
            Post for Tuition
          </h4>
        </div>
        <TuitionPostForm
          id={student.data._id}
          whatsApp={student.data.whatsApp}
        />
      </div>
      <StudentTuitions id={student.data._id}></StudentTuitions>
    </div>
  );
};

export default StudentProfile;
