import { useForm, SubmitHandler } from "react-hook-form";
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
    toast.success("Login Successful!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f0f4f9] to-[#e0e9f4] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
        {/* Header Section */}
        <div className="bg-[#00ccb1] p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
          <p className="text-sm text-white mt-2">
            Login to continue your journey
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
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
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                Unauthorized or verify your email address
              </p>
            )}

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#00ccb1] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#00b8a0] transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Registration Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <Link
                to="/auth/sign-up/teacher"
                className="text-[#00ccb1] hover:underline"
              >
                Register as Teacher
              </Link>{" "}
              or{" "}
              <Link
                to="/auth/sign-up/student"
                className="text-[#00ccb1] hover:underline"
              >
                Register as Student
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Verify Email Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                const modal = document.getElementById(
                  "verifyEmailModal"
                ) as HTMLDialogElement | null;
                if (modal) modal.showModal();
              }}
              className="text-sm text-[#00ccb1] hover:underline cursor-pointer"
            >
              Verify Email
            </button>
          </div>
        </div>
      </div>

      {/* Email Verification Modal */}
      <EmailVerificationModal />
    </div>
  );
};

export default Login;
