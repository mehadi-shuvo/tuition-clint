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

  const { data, error, isLoading } = useGetOneTeacherQuery(params.id as string);
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
  console.log(error);

  const show = [];
  for (let i = 0; i < subjects.length; i++) {
    if (i == subjects.length - 1) {
      show.push(subjects[i]);
    } else {
      show.push(subjects[i] + " |");
    }
  }

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
          <div
            style={{ whiteSpace: "pre-wrap" }}
            className="text-base text-slate-400"
          >
            {description}
          </div>
        </div>
        <div>
          <div className="md:flex md:justify-end md:flex-col md:items-end space-y-3">
            <img className="w-[300px] rounded-lg" src={studentIDPhoto} alt="" />
          </div>
          <div className="flex justify-center items-center md:justify-end pt-8">
            <div className="flex gap-5">
              <PhoneButton phone={whatsApp} />
              <ContactButton phone={whatsApp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAbout;
