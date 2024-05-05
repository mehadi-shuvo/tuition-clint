import { useForm, SubmitHandler } from "react-hook-form";
import "../../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { tokenDecoder } from "../../utils/tokenDecoder";
import EmailVerificationModal from "../../components/ModalBody/EmailVerificationModal";
import toast from "react-hot-toast";
interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [login, { error, isSuccess }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();

    const user = tokenDecoder(res.data.token);

    dispatch(setUser({ user: user, token: res.data.token }));
    navigate(from);
  };
  if (isSuccess) {
    toast.success("login Successfully!");
  }
  return (
    <div>
      <div className="flex justify-center items-center my-20 ">
        <div className="w-4/5 md:w-1/2 mx-auto p-5 lg:p-10 bg-slate-950 text-white rounded-lg">
          <h1 className="text-4xl lg:text-7xl font-extrabold  text-center brand-text-color uppercase pb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email and password */}
            <div className="grid gap-5 mb-5">
              <div className="">
                <label
                  htmlFor="input"
                  className="block text-white text-sm font-bold mb-2"
                >
                  E-mail
                </label>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  placeholder="Ex. Enter your email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-gray-600 text-xs italic mt-2">
                  Please enter your email.
                </p>
              </div>
              <div className="">
                <label
                  htmlFor="input"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Ex. Your Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-gray-600 text-xs italic mt-2">
                  Please enter your password.
                </p>
              </div>
            </div>
            <p className="text-red-500 text-base text-center italic">
              {error ? "Unauthorized or verify your email address" : ""}
            </p>
            <div className="flex justify-center items-center pt-5">
              <button
                className="bg-[#00ccb1] hover:bg-[#2b796e] ease-in delay-200 transition-all px-10 py-2 md:py-3 rounded-md text-lg md:text-xl font-bold uppercase"
                type="submit"
              >
                login
              </button>
            </div>
            <p className="text-center text-sm text-slate-400 mt-4">
              Want to create an account?{" "}
              <Link
                className="border-b border-[#00ccb1] "
                to={`/auth/sign-up/teacher`}
              >
                Register as teacher
              </Link>{" "}
              or{" "}
              <Link
                className="border-b border-[#00ccb1] "
                to={`/auth/sign-up/student`}
              >
                Register as student
              </Link>
            </p>
            <div className="divider divider-neutral">OR</div>
            <div className="flex justify-center items-center">
              <span
                onClick={() => {
                  const modal = document.getElementById(
                    "verifyEmailModal"
                  ) as HTMLDialogElement | null;
                  if (modal !== null) {
                    modal.showModal();
                  }
                }}
                className="border-b border-[#00ccb1] text-sm text-slate-400 cursor-pointer"
              >
                Verify Email
              </span>
            </div>
          </form>
        </div>
      </div>
      <EmailVerificationModal />
    </div>
  );
};

export default Login;
