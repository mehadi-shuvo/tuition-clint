import { SubmitHandler, useForm } from "react-hook-form";
import { TParamsQuery, TPost, TUser } from "../Home/types";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  useCreatePostMutation,
  useGetThanasQuery,
} from "../../redux/features/post/postApi";
import { allDistrictsArray } from "../../assets/district";
import { paperPlaneSVG } from "../../assets/svgs/localSVGs";
import { useGetOneStudentByIdQuery } from "../../redux/features/student/studentApi";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import { watchLoader } from "../../utils/loader";

const TuitionPostForm = () => {
  const user: TUser | null = useAppSelector(useAuthCurrentUser);

  const { isLoading, data: student } = useGetOneStudentByIdQuery(user?.email);
  const [params, setParams] = useState<TParamsQuery[] | undefined>(undefined);
  const { data: thanas } = useGetThanasQuery(params);

  const [createPost] = useCreatePostMutation();

  const handleDistrict = (value: string) => {
    const queryParams: TParamsQuery[] = [];
    queryParams.push({ name: "district", value: value });
    setParams(queryParams);
  };

  const { register, handleSubmit, reset } = useForm<TPost>();
  const onSubmit: SubmitHandler<TPost> = async (data) => {
    const postData = {
      title: data.title,
      class: data.class,
      district: data.district,
      thana: data.thana,
      description: data.description,
      userId: student.data.userId,
      whatsApp: student.data.whatsApp,
    };

    const result = await createPost(postData).unwrap();
    if (result.success) {
      toast.success("Successfully posted your tuition");
      reset();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg text-slate-700 my-24">
      <h1 className="text-3xl font-bold text-[#00ccb1] mb-6 text-center">
        Post Your Tuition
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Ex: Science Teacher"
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
          />
        </div>

        {/* Class Input */}
        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">Class</label>
          <input
            type="text"
            placeholder="Ex: HSC"
            {...register("class", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
          />
        </div>

        {/* Location Inputs */}
        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">Location</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              {...register("district", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
              onChange={(e) => handleDistrict(e.target.value)}
            >
              <option disabled selected>
                Select District
              </option>
              {allDistrictsArray.sort().map((dis) => (
                <option
                  className="capitalize"
                  key={dis}
                  value={dis.toLowerCase()}
                >
                  {dis}
                </option>
              ))}
            </select>
            <select
              {...register("thana", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
            >
              <option disabled selected>
                Select Upazila
              </option>
              {thanas?.data?.thanas.map((tha: string) => (
                <option
                  className="capitalize"
                  key={tha}
                  value={tha.toLowerCase()}
                >
                  {tha}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Describe your tuition requirements"
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent resize-none"
            rows={4}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#00ccb1] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#00b8a0] transition-all duration-300"
        >
          Post {paperPlaneSVG}
        </button>
      </form>
    </div>
  );
};

export default TuitionPostForm;
