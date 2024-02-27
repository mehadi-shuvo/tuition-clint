import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  example: string;
  exampleRequired: string;
};

const TeacherRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="flex justify-center items-center bg-grid-black/[0.2] ">
      <div className="w-4/5 md:w-1/2 mx-auto p-10 bg-slate-950 text-white rounded-lg">
        <h1 className="text-4xl font-bold text-center capitalize pb-8">
          Sign Up as a Teacher
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center h-screen">
            <div className="">
              <label
                htmlFor="input"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                id="input"
                type="text"
                placeholder="Enter your username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-gray-600 text-xs italic mt-2">
                Please enter your username.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;
