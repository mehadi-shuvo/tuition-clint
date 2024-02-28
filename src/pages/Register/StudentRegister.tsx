import { useForm, SubmitHandler } from "react-hook-form";
import "../../App.css";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  conPass: string;
}

const StudentRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div className="flex justify-center items-center my-20 ">
      <div className="w-4/5 md:w-3/5 mx-auto p-10 bg-slate-950 text-white rounded-lg">
        <h1 className="text-4xl font-bold text-center brand-text-color capitalize pb-8">
          Join as a Student
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

export default StudentRegister;
