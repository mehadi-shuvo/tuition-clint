import { useForm, SubmitHandler } from "react-hook-form";
import "../../App.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeSubject,
  setSubjects,
} from "../../redux/features/register/subjectsSlice";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { imageHosting } from "../../utils/imageHosting";
import { useCreateTeacherMutation } from "../../redux/features/teacher/teacherApi";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenDecoder } from "../../utils/tokenDecoder";
import { setUser } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";

interface IFormInput {
  name: string;
  university: string;
  email: string;
  phone: string;
  whatsApp: string;
  photo: string;
  subjects: string[];
  studentID: string;
  description: string;
  password: string;
  conPass: string;
  classRange: string;
}

const TeacherRegister = () => {
  const [login] = useLoginMutation();
  const [createTeacher] = useCreateTeacherMutation();
  const [selectedSubjects, setSelectedSubject] = useState("");
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(
    (state: RootState) => state.subjectsSlice.subjects
  );

  // console.log(teacherData);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  // console.log(imageData);

  const { register, handleSubmit } = useForm<IFormInput>();

  //submit handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // account owner image process
    const image = data.photo[0];
    const imageData = new FormData();
    imageData.append("image", image);
    const imgInfo = await imageHosting(imageData);

    // account owner's student id card image process
    const idCard = data.studentID[0];
    const idCardData = new FormData();
    idCardData.append("image", idCard);
    const idCardInfo = await imageHosting(idCardData);

    // call createTeacher Api
    const {
      name,
      university,
      description,
      whatsApp,
      email,
      password,
      classRange,
    } = data;
    await createTeacher({
      name,
      university,
      whatsApp,
      email,
      classRange,
      description,
      password,
      photo: imgInfo.data.url,
      studentIDPhoto: idCardInfo.data.url,
      subjects: subjects,
    }).unwrap();

    // make userInfo for login
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // login, set data and redirect
    const res = await login(userInfo).unwrap();
    const user = tokenDecoder(res.data.token);
    dispatch(setUser({ user: user, token: res.data.token }));
    navigate(from);
  };

  const subjectSelectionHandler = (e: string) => {
    dispatch(setSubjects(e));
    setSelectedSubject(e);
  };

  const subjectRemoveHandler = (sub: string) => {
    dispatch(removeSubject(sub));
  };
  return (
    <div className="flex justify-center items-center my-20 ">
      <div className="w-4/5 md:w-3/5 mx-auto p-10 bg-slate-950 text-white rounded-lg">
        <h1 className="text-4xl font-bold text-center brand-text-color capitalize pb-8">
          Register as Teacher
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name university row */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Ex. Mehadi Hasan"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please enter your name.
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                University Name
              </label>
              <input
                {...register("university")}
                type="text"
                placeholder="Ex. Dhaka University"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please enter your university name.
              </p>
            </div>
          </div>
          {/* phone email row */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                WhatsApp Number
              </label>
              <input
                {...register("whatsApp")}
                type="text"
                placeholder="Ex. 01700000000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                It is important student will contact by this.
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                E-mail
              </label>
              <input
                {...register("email")}
                type="text"
                placeholder="Ex. example@gmail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please enter your email.
              </p>
            </div>
          </div>
          {/* self and student ID pic*/}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Photo
              </label>
              <input
                {...register("photo")}
                type="file"
                className="file-input file-input-bordered file-input-md w-full border-none h-9 bg-white text-slate-900"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please add your photo.
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Student ID
              </label>
              <input
                {...register("studentID")}
                type="file"
                placeholder="Ex. example@gmail.com"
                className="file-input file-input-bordered file-input-md w-full border-none h-9 bg-white text-slate-900"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please add your student ID picture.
              </p>
            </div>
          </div>
          {/* Subjects and class limit */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Subjects
              </label>
              <div className="grid grid-cols-2 items-center gap-2">
                <select
                  value={selectedSubjects}
                  onChange={(e) => subjectSelectionHandler(e.target.value)}
                  className="select select-bordered w-full bg-white text-stone-950"
                >
                  <option value="" disabled selected>
                    Select Subjects
                  </option>
                  <option value="Bangla">Bangla</option>
                  <option value="English">English</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
                <div
                  className={`overflow-x-scroll flex gap-2 items-center ${
                    subjects.length > 0 && "bg-white rounded-md py-[6px] px-1"
                  }`}
                >
                  {subjects.map((subject) => (
                    <div
                      key={subject}
                      className="bg-blue-400 px-2 py-1 rounded-md flex items-center relative"
                    >
                      {subject}
                      <div
                        onClick={() => subjectRemoveHandler(subject)}
                        className=" bg-slate-950 size-3 flex justify-center cursor-pointer items-center rounded-full text-white absolute top-0 right-0 text-xs"
                      >
                        <span className="mb-[1px]">x</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-xs italic mt-2">
                Please enter subjects as like example.
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Class range
              </label>
              <select
                {...register("classRange")}
                className="text-center select select-bordered w-full bg-white text-stone-950"
              >
                <option value="1-12">Class 1 to 12</option>
                <option value="1-10">Class 1 to 10</option>
                <option value="1-8">Class 1 to 8</option>
                <option value="1-6">Class 1 to 6</option>
              </select>
              <p className="text-gray-600 text-xs italic mt-2">
                Please select which classes you are in comfortable.
              </p>
            </div>
          </div>
          {/* description */}
          <div className="grid  mb-5">
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                About your-self
              </label>
              <textarea
                {...register("description")}
                placeholder="Ex. Describe your-self properly"
                className="h-[100px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          {/* password and confirm password */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="text"
                placeholder="Ex. make a strong password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please enter your password.
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                {...register("conPass")}
                type="text"
                placeholder="Ex. confirm your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please re-enter your password.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center pt-5">
            <button
              className="bg-[#00ccb1] px-10 py-3 rounded-md text-xl font-bold uppercase"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;
