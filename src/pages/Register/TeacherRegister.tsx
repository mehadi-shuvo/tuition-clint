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
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { allDistrictsArray } from "../../assets/district";
import { TImageApiResponse } from "../Home/types";

interface IFormInput {
  name: string;
  university: string;
  email: string;
  phone: string;
  whatsApp: string;
  photo: string;
  district: string;
  subjects: string[];
  studentID: string;
  description: string;
  password: string;
  conPass: string;
  classRange: string;
}

const TeacherRegister = () => {
  const [createTeacher] = useCreateTeacherMutation();
  const [selectedSubjects, setSelectedSubject] = useState("");
  const [pass, setpass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(
    (state: RootState) => state.subjectsSlice.subjects
  );

  console.log(pass);

  const handleCheckPss = (value: string) => {
    if (value === pass) {
      setConfirmPassword(true);
    }
  };

  // console.log(teacherData);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  //submit handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(errors.name);
    // account owner image process
    const image = data.photo[0];
    const imageData = new FormData();
    imageData.append("image", image);
    const imgInfo: TImageApiResponse | undefined = await imageHosting(
      imageData
    );

    // account owner's student id card image process
    // let idCardInfo: { studentIDPhoto: string } | undefined;
    const idCard = data.studentID[0];
    const idCardData = new FormData();
    idCardData.append("image", idCard);
    const idCardInfo: TImageApiResponse | undefined = await imageHosting(
      idCardData
    );

    //     >z>z

    // call createTeacher Api
    const {
      name,
      university,
      description,
      whatsApp,
      email,
      district,

      password,
      classRange,
    } = data;
    await createTeacher({
      name,
      university,
      whatsApp,
      district,
      email,
      classRange,
      description,
      password,
      photo: imgInfo!.data.display_url,
      studentIDPhoto: idCardInfo!.data.display_url,
      subjects: subjects,
    }).unwrap();

    // make userInfo for login

    navigate("/auth/login");
    toast.success(
      "Successfully registered. Please check your email. If you not find please check spam folder",
      { duration: 6000 }
    );
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
      <div className="w-11/12 md:w-3/5 mx-auto p-5 lg:p-10 bg-slate-950 text-white rounded-lg">
        <h1 className="text-2xl lg:text-4xl font-bold text-center brand-text-color capitalize pb-8">
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
                {...register("name", { required: true })}
                type="text"
                placeholder="Ex. Mehadi Hasan"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.name ? (
                  <span className="text-red-600">Name is required</span>
                ) : (
                  ""
                )}
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
                {...register("university", { required: true })}
                type="text"
                placeholder="Ex. Dhaka University"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.university ? (
                  <span className="text-red-600">
                    University or Collage name is required
                  </span>
                ) : (
                  ""
                )}
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
                {...register("whatsApp", { required: true })}
                type="text"
                placeholder="Ex. 01700000000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.whatsApp ? (
                  <span className="text-red-600">
                    WhatsApp number is required for contact
                  </span>
                ) : (
                  ""
                )}
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
                {...register("email", { required: true })}
                type="email"
                placeholder="Ex. example@gmail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.email ? (
                  <span className="text-red-600">
                    Email is required for contact
                  </span>
                ) : (
                  ""
                )}
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
                {...register("photo", { required: true })}
                type="file"
                className="file-input file-input-bordered file-input-md w-full border-none h-9 bg-white text-slate-900"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.photo ? (
                  <span className="text-red-600">Your picture is required</span>
                ) : (
                  ""
                )}
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
                {...register("studentID", { required: true })}
                type="file"
                placeholder="Ex. example@gmail.com"
                className="file-input file-input-bordered file-input-md w-full border-none h-9 bg-white text-slate-900"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.studentID ? (
                  <span className="text-red-600">
                    Your student ID card's picture is required
                  </span>
                ) : (
                  ""
                )}
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
                {subjects.length === 0 ? (
                  <span className="text-red-600">
                    You should must select minimum one subject
                  </span>
                ) : (
                  ""
                )}
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
                {...register("classRange", { required: true })}
                className="text-center select select-bordered w-full bg-white text-stone-950"
              >
                <option value="1-12">Class 1 to 12</option>
                <option value="1-10">Class 1 to 10</option>
                <option value="1-8">Class 1 to 8</option>
                <option value="1-6">Class 1 to 6</option>
              </select>
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.classRange ? (
                  <span className="text-red-600">
                    Select your class range it's required
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
          {/* location */}
          <div className="grid  mb-5">
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                Location
              </label>
              <select
                {...register("district", { required: true })}
                className="rounded-md py-2 px-3 text-black bg-white w-full"
              >
                <option disabled selected>
                  Select District
                </option>
                {allDistrictsArray.sort().map((dis) => (
                  <option key={dis} value={dis.toLowerCase()}>
                    {dis}
                  </option>
                ))}
              </select>
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.district ? (
                  <span className="text-red-600">
                    Your location is required
                  </span>
                ) : (
                  ""
                )}
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
                {...register("description", { required: true })}
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
                {...register("password", { required: true })}
                onBlur={(e) => setpass(e.target.value)}
                type="password"
                placeholder="Ex. make a strong password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.password ? (
                  <span className="text-red-600">password is required</span>
                ) : (
                  ""
                )}
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
                {...register("conPass", { required: true })}
                onChange={(e) => handleCheckPss(e.target.value)}
                type="password"
                placeholder="Ex. confirm your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex justify-center items-center pt-5">
            <button
              disabled={!confirmPassword}
              className={`bg-[#00ccb1] px-10 py-3 rounded-md text-xl font-bold uppercase disabled:bg-slate-600`}
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;
