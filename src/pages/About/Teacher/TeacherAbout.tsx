import { BackgroundBeamsDemo } from "../../../components/BackgroundBeams/BackgroundBeamsDemo";
import { BackgroundGradientRound } from "../../../components/ui/round-gradient";
import "../../../App.css";
import PhoneButton from "../../../components/Buttonts/PhoneButton";
import ContactButton from "../../../components/Buttonts/ContactButton";
import { useParams } from "react-router-dom";
import { useGetOneTeacherQuery } from "../../../redux/features/teacher/teacherApi";
import { watchLoader } from "../../../utils/loader";

const TeacherAbout = () => {
  const params = useParams();
  const { data, isLoading } = useGetOneTeacherQuery(params.id as string);

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

  const formattedSubjects = subjects.join(" | ");

  return (
    <div className="min-h-screen text-white">
      <BackgroundBeamsDemo />
      <div className="container mx-auto px-4 pb-12 relative z-10">
        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Profile Card */}
          <div className="w-full lg:w-1/3 bg-slate-900 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <BackgroundGradientRound>
                <img
                  className="size-48 rounded-full object-cover"
                  src={photo}
                  alt={name}
                />
              </BackgroundGradientRound>
              <h1 className="text-3xl font-bold mt-6 capitalize">{name}</h1>
              <h2 className="text-xl font-medium brand-text-color mt-2 capitalize">
                {university}
              </h2>
              <h3 className="text-lg mt-2">Class {classRange}</h3>
              <p className="text-lg mt-2 text-slate-400">{formattedSubjects}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <PhoneButton phone={whatsApp} />
              <ContactButton phone={whatsApp} />
            </div>

            {/* Student ID Photo */}
            <div className="mt-8 flex justify-center lg:justify-center items-center">
              <img
                className="w-full max-w-[300px] rounded-lg"
                src={studentIDPhoto}
                alt="Student ID"
              />
            </div>
          </div>

          {/* Right Side: Details Card */}
          <div className="w-full lg:w-2/3 bg-slate-900 rounded-lg p-6 shadow-lg">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About Me</h2>
              <div
                className="text-slate-400 text-base"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAbout;
