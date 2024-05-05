import { Navigate, useParams } from "react-router-dom";
import { useGetOneTeacherBYIdQuery } from "../../redux/features/teacher/teacherApi";
import { BackgroundBeamsDemo } from "../../components/BackgroundBeams/BackgroundBeamsDemo";
import { BackgroundGradientRound } from "../../components/ui/round-gradient";
import { phoneSVG, whatsAppSVG } from "../../assets/svgs/localSVGs";
import "../../App.css";
import ModalBody from "../../components/ModalBody/ModalBody";
import { watchLoader } from "../../utils/loader";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const TeacherProfile = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const { data, isLoading } = useGetOneTeacherBYIdQuery(id as string);
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
  } = data?.data;
  console.log(data);

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
    <div className="">
      <div>
        <BackgroundBeamsDemo />
        <div className="relative z-10 flex justify-center items-center pb-10 -mt-[100px]">
          <BackgroundGradientRound>
            <img
              className="z-10 size-48 rounded-full mx-auto"
              src={photo}
              alt=""
            />
          </BackgroundGradientRound>
        </div>
      </div>
      <div className="w-4/5 mx-auto grid md:grid-cols-2 ">
        <div>
          <div className="">
            <h1 className="text-4xl font-bold pb-3 capitalize">{name}</h1>
            <h1 className="text-xl font-medium capitalize brand-text-color pb-3">
              {university}
            </h1>
            <h4 className="text-lg capitalize pb-2">class {classRange}</h4>
            <h3 className="flex gap-2 text-lg pb-5">
              {show.map((subject) => (
                <span key={subject}>{subject}</span>
              ))}
            </h3>
          </div>
          <div className="text-base text-slate-400">{description}</div>
        </div>
        <div>
          <div className="md:flex md:justify-end md:flex-col md:items-end space-y-3">
            <img className="w-[300px] rounded-lg" src={studentIDPhoto} alt="" />
          </div>
          <div className="flex justify-center items-center md:justify-end pt-8">
            <div className="grid gap-3">
              <p className="flex text-base gap-2 bg-white rounded-md py-2 items-center text-slate-900 px-3">
                {phoneSVG} {whatsApp}
              </p>
              <p className="flex text-base gap-2 bg-green-500 rounded-md py-2 items-center text-white px-3">
                {whatsAppSVG} {whatsApp}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex gap-5 mt-10">
          <button
            disabled
            // className="main-btn rounded-md text-2xl font-bold uppercase cursor-pointer"
            className="hidden"
            onClick={() =>
              (
                document.getElementById("UPDATE") as HTMLDialogElement | null
              )?.showModal?.()
            }
          >
            Update
          </button>
          <button
            onClick={logoutHandler}
            className="main-btn-outline rounded-md text-2xl font-bold uppercase cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <ModalBody></ModalBody>
    </div>
  );
};

export default TeacherProfile;
