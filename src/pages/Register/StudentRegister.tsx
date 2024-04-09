import { useForm, SubmitHandler } from "react-hook-form";
import "../../App.css";
import { useState } from "react";
import { imageHosting } from "../../utils/imageHosting";
import { useCreateStudentMutation } from "../../redux/features/student/studentApi";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenDecoder } from "../../utils/tokenDecoder";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

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
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // account owner image process
    const image = data.photo[0];
    const imageData = new FormData();
    imageData.append("image", image);
    const imgInfo = await imageHosting(imageData);

    const studentInfo = {
      name: data.name,
      schoolOrCollage: data.schoolOrCollage,
      email: data.email,
      whatsApp: data.whatsApp,
      photo: imgInfo.data.url,
      password: data.password,
    };
    // creating user
    await createStudent(studentInfo).unwrap();
    // login user
    const userInfoForLogin = {
      email: data.email,
      password: data.password,
    };

    const res = await login(userInfoForLogin).unwrap();
    const user = tokenDecoder(res.data.token);
    dispatch(setUser({ user: user, token: res.data.token }));
    reset();
    navigate(from);
  };

  return (
    <div className="flex justify-center items-center my-20 ">
      <div className="w-4/5 md:w-3/5 mx-auto p-10 bg-slate-950 text-white rounded-lg">
        <h1 className="text-4xl font-bold text-center brand-text-color capitalize pb-8">
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
                Please enter your name.
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="input"
                className="block text-white text-sm font-bold mb-2"
              >
                School/Collage
              </label>
              <input
                {...register("schoolOrCollage", { required: true })}
                type="text"
                placeholder="Ex. Dhaka Collage"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please enter school or Collage name.
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
                Please enter your whatsApp Number.
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
                Please enter your email.
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
                {...register("photo")}
                type="file"
                className="file-input file-input-bordered file-input-md w-full border-none h-9 bg-white text-slate-900"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please add your photo.
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Ex. confirm your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                {confirmPassword ? (
                  confirmPassword !== password ? (
                    <span className="text-red-500">
                      Password is not matched. Please try again!
                    </span>
                  ) : (
                    <span className="text-green-500">Password matched!</span>
                  )
                ) : (
                  <span>Re-enter your password</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center pt-5">
            <button
              disabled={
                password !== confirmPassword || password === "" ? true : false
              }
              className={`bg-[#00ccb1] px-10 py-3 rounded-md text-xl font-bold uppercase btn`}
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
