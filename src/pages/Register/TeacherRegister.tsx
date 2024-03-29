import { useForm, SubmitHandler } from "react-hook-form";
import "../../App.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeSubject,
  setSubjects,
} from "../../redux/features/register/subjectsSlice";
import { RootState } from "../../redux/store";
import React, { useState } from "react";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  whatsApp: string;
  photo: string;
  subjects: string;
  studentID: string;
  description: string;
  password: string;
  conPass: string;
}

const TeacherRegister = () => {
  const [selectedSubjects, setSelectedSubject] = useState("");
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(
    (state: RootState) => state.subjectsSlice.subjects
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
          Sign Up as a Teacher
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name email row */}
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
                {...register("email", { required: true })}
                type="email"
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
                {...register("whatsApp", { required: true })}
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
                {...register("email", { required: true })}
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
                {...register("photo", { required: true })}
                type="text"
                placeholder="Ex. 01700000000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                {...register("studentID", { required: true })}
                type="text"
                placeholder="Ex. example@gmail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <div className="overflow-x-scroll flex gap-2 items-center">
                  {subjects.map((subject) => (
                    <div
                      key={subject}
                      className="bg-blue-400 px-2 py-1 rounded-md flex items-center relative"
                    >
                      {subject}
                      <div
                        onClick={() => subjectRemoveHandler(subject)}
                        className=" bg-white size-3 flex justify-center cursor-pointer items-center rounded-full text-black absolute top-0 right-0 text-xs"
                      >
                        x
                      </div>
                    </div>
                  ))}
                </div>
                <select
                  value={selectedSubjects}
                  onChange={(e) => subjectSelectionHandler(e.target.value)}
                  className="select select-bordered w-full max-w-xs bg-white text-stone-950"
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
                defaultValue="1-12"
                className="w-full text-center text-black py-2 rounded-md"
              >
                <option value="1-12">class 1-12</option>
                <option value="1-10">class 1-10</option>
                <option value="1-8">class 1-8</option>
                <option value="1-6">class 1-6</option>
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
                {...register("conPass", { required: true })}
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
