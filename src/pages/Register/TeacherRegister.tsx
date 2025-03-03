import { useForm, SubmitHandler } from "react-hook-form";
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
  photo: FileList;
  district: string;
  subjects: string[];
  studentID: FileList;
  description: string;
  password: string;
  conPass: string;
  classRange: string;
}

const TeacherRegister = () => {
  const [createTeacher] = useCreateTeacherMutation();
  const [selectedSubjects, setSelectedSubject] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(
    (state: RootState) => state.subjectsSlice.subjects
  );
  const navigate = useNavigate();

  const handleCheckPass = (value: string) => {
    if (value === pass) {
      setConfirmPassword(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // Image upload process
    const image = data.photo[0];
    const imageData = new FormData();
    imageData.append("image", image);
    const imgInfo: TImageApiResponse | undefined = await imageHosting(
      imageData
    );

    // Student ID card upload process
    const idCard = data.studentID[0];
    const idCardData = new FormData();
    idCardData.append("image", idCard);
    const idCardInfo: TImageApiResponse | undefined = await imageHosting(
      idCardData
    );

    // Create teacher
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

    navigate("/auth/login");
    toast.success(
      "Successfully registered. Please check your email. If you don't find it, please check your spam folder.",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f0f4f9] to-[#e0e9f4] p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
        {/* Header Section */}
        <div className="bg-[#00ccb1] p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Register as Teacher</h1>
          <p className="text-sm text-white mt-2">
            Join us to start your teaching journey
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and University Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Ex. Mehadi Hasan"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="university"
                  className="block text-sm font-medium text-gray-700"
                >
                  University
                </label>
                <input
                  {...register("university", { required: true })}
                  type="text"
                  placeholder="Ex. Dhaka University"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.university && (
                  <p className="text-red-500 text-sm mt-1">
                    University name is required
                  </p>
                )}
              </div>
            </div>

            {/* WhatsApp and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="whatsApp"
                  className="block text-sm font-medium text-gray-700"
                >
                  WhatsApp
                </label>
                <input
                  {...register("whatsApp", { required: true })}
                  type="text"
                  placeholder="Ex. 01700000000"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.whatsApp && (
                  <p className="text-red-500 text-sm mt-1">
                    WhatsApp number is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Ex. example@gmail.com"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
            </div>

            {/* Photo and Student ID Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="file"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">Photo is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="studentID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student ID
                </label>
                <input
                  {...register("studentID", { required: true })}
                  type="file"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.studentID && (
                  <p className="text-red-500 text-sm mt-1">
                    Student ID is required
                  </p>
                )}
              </div>
            </div>

            {/* Subjects and Class Range Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="subjects"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subjects
                </label>
                <div className="flex flex-col items-center gap-2">
                  <select
                    value={selectedSubjects}
                    onChange={(e) => subjectSelectionHandler(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                  >
                    <option value="" disabled>
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
                  <div className="flex gap-2 flex-wrap">
                    {subjects.map((subject) => (
                      <div
                        key={subject}
                        className="bg-blue-400 px-2 py-1 rounded-md flex items-center relative"
                      >
                        {subject}
                        <div
                          onClick={() => subjectRemoveHandler(subject)}
                          className="bg-slate-950 size-3 flex justify-center cursor-pointer items-center rounded-full text-white absolute top-0 right-0 text-xs"
                        >
                          <span className="mb-[1px]">x</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {subjects.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    You must select at least one subject
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="classRange"
                  className="block text-sm font-medium text-gray-700"
                >
                  Class Range
                </label>
                <select
                  {...register("classRange", { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                >
                  <option value="1-12">Class 1 to 12</option>
                  <option value="1-10">Class 1 to 10</option>
                  <option value="1-8">Class 1 to 8</option>
                  <option value="1-6">Class 1 to 6</option>
                </select>
                {errors.classRange && (
                  <p className="text-red-500 text-sm mt-1">
                    Class range is required
                  </p>
                )}
              </div>
            </div>

            {/* Location and Description Row */}
            <div className="grid gap-6">
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  {...register("district", { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {allDistrictsArray.sort().map((dis) => (
                    <option key={dis} value={dis.toLowerCase()}>
                      {dis}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">
                    Location is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  About Yourself
                </label>
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Describe yourself properly"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    Description is required
                  </p>
                )}
              </div>
            </div>

            {/* Password and Confirm Password Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  onBlur={(e) => setPass(e.target.value)}
                  type="password"
                  placeholder="Enter a strong password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="conPass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  {...register("conPass", { required: true })}
                  onChange={(e) => handleCheckPass(e.target.value)}
                  type="password"
                  placeholder="Confirm your password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {confirmPassword ? (
                  <p className="text-green-500 text-sm mt-1">
                    Password matched
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    Re-enter your password
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                disabled={!confirmPassword}
                type="submit"
                className="w-full bg-[#00ccb1] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#00b8a0] transition-all duration-300 disabled:bg-gray-400"
              >
                Register
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/auth/login" className="text-[#00ccb1] hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;
