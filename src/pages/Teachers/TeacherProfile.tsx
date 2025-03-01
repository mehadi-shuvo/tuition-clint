import { useParams } from "react-router-dom";
import { useGetOneTeacherBYIdQuery } from "../../redux/features/teacher/teacherApi";
import "../../App.css";
import { watchLoader } from "../../utils/loader";
import { useAppDispatch } from "../../redux/hooks";
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

  return (
    <div className="">
      <div className="w-4/5 mx-auto">
        <div className="grid md:flex gap-8 mt-32">
          <div className="">
            <img
              className="w-[350px] h-[200px] rounded-lg"
              src={studentIDPhoto}
              alt=""
            />
          </div>
          <div className="">
            <h1 className="text-3xl font-bold capitalize">{name}</h1>
            <h1 className="text-xl font-normal capitalize brand-text-color pb-3">
              {university}
            </h1>
            <div className="flex items-center gap-2 bg-[#ffffff36] rounded-sm py-1 px-2 mb-2">
              <span className="text-lg capitalize">Class Range:</span>
              <div className="text-white">{classRange}</div>
            </div>
            <div className="flex items-center gap-2 bg-[#ffffff36] rounded-sm py-1 px-2 mb-2">
              <span className="text-lg capitalize">Subjects:</span>
              <h3 className="flex gap-2 text-lg">
                {show.map((subject) => (
                  <span key={subject}>{subject}</span>
                ))}
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-[#ffffff36] rounded-sm py-1 px-2 mb-2">
              <span className="text-lg capitalize">WhatsApp:</span>
              <div className="text-white">{whatsApp}</div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <p style={{ whiteSpace: "pre-wrap" }} className="text-slate-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
