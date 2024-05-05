import { useForm, SubmitHandler } from "react-hook-form";
import "../../App.css";
import { useState } from "react";
import { imageHosting } from "../../utils/imageHosting";
import { useCreateStudentMutation } from "../../redux/features/student/studentApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TImageApiResponse } from "../Home/types";

interface IFormInput {
  name: string;
  email: string;
  whatsApp: string;
  schoolOrCollage: string;
  photo: string;
  password: string;
  conPass: string;
}

const StudentRegister = () => {
  const [createStudent] = useCreateStudentMutation();
  const [pass, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const checkConfirmPassword = (value: string) => {
    if (pass === value) {
      setConfirmPassword(true);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // account owner image process
    const image = data.photo[0];
    const imageData = new FormData();
    imageData.append("image", image);
    const imgInfo: TImageApiResponse | undefined = await imageHosting(
      imageData
    );

    const studentInfo = {
      name: data.name,
      schoolOrCollage: data.schoolOrCollage,
      email: data.email,
      whatsApp: data.whatsApp,
      photo: imgInfo!.data.url,
      password: data.password,
    };
    // creating user
    await createStudent(studentInfo).unwrap();
    // login user
    reset();
    navigate("/auth/login");
    toast.success(
      "Successfully registered. Please check your email. If you not find please check spam folder",
      { duration: 6000 }
    );
  };

  return (
    <div className="flex justify-center items-center my-20 ">
      <div className="w-11/12 md:w-3/5 mx-auto p-5 lg:p-10 bg-slate-950 text-white rounded-lg">
        <h1 className="text-2xl lg:text-4xl font-bold text-center brand-text-color capitalize pb-8">
          Register as Student
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name collage row */}
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
                School/College
              </label>
              <input
                {...register("schoolOrCollage", { required: true })}
                type="text"
                placeholder="Ex. Dhaka College"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.schoolOrCollage ? (
                  <span className="text-red-600">
                    School or College name is is required
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
                WhatsApp
              </label>
              <input
                {...register("whatsApp", { required: true })}
                type="text"
                placeholder="Ex. 017340000000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {errors.whatsApp ? (
                  <span className="text-red-600">
                    WhatsApp number is required
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
                  <span className="text-red-600">G-mail is required</span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>

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
                onBlur={(e) => setPassword(e.target.value)}
                type="password"
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
                onChange={(e) => checkConfirmPassword(e.target.value)}
                type="password"
                placeholder="Ex. confirm your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {confirmPassword ? (
                  <span className="text-green-600">password matched</span>
                ) : (
                  "re-enter your password"
                )}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center pt-5">
            <button
              disabled={!confirmPassword}
              className={`bg-[#00ccb1] px-10 py-3 rounded-md text-xl font-bold uppercase disabled:bg-slate-600`}
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

export default StudentRegister;
