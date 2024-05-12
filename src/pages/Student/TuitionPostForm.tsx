import { SubmitHandler, useForm } from "react-hook-form";
import { TParamsQuery, TPost } from "../Home/types";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  useCreatePostMutation,
  useGetThanasQuery,
} from "../../redux/features/post/postApi";
import { allDistrictsArray } from "../../assets/district";
import { paperPlaneSVG } from "../../assets/svgs/localSVGs";

const TuitionPostForm = ({
  id,
  whatsApp,
}: {
  id: string;
  whatsApp: string;
}) => {
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
      userId: id,
      whatsApp: whatsApp,
    };

    const result = await createPost(postData).unwrap();
    if (result.success) {
      toast.success("Successfully posted your tuition", {
        position: "top-center",
      });
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 ">
      <div className="flex flex-col mt-2">
        <label className="text-lg">Title</label>
        <input
          className="rounded-md py-2 px-3 text-stone-800"
          type="text"
          placeholder="ex: Science Teacher"
          {...register("title", { required: true })}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label className="text-lg">Class</label>
        <input
          className="rounded-md py-2 px-3 text-stone-800"
          type="text"
          placeholder="ex: HSC"
          {...register("class", { required: true })}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label className="text-lg">Location</label>
        <div className="grid grid-cols-2 gap-3">
          <select
            {...register("district", { required: true })}
            className="rounded-md py-2 px-3 text-stone-800 bg-white w-full"
            onChange={(e) => handleDistrict(e.target.value)}
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
          <select
            {...register("thana", { required: true })}
            className="rounded-md py-2 px-3 text-stone-800 bg-white w-full"
          >
            <option disabled selected>
              select Upazila
            </option>
            {thanas?.data?.thanas.map((tha: string) => (
              <option key={tha} value={tha.toLowerCase()}>
                {tha}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <label className="text-lg"> Describe</label>
        <textarea
          className="rounded-lg py-2 px-3 h-32 text-stone-800"
          placeholder="describe your tuition requirements"
          {...register("description", { required: true })}
        ></textarea>
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 justify-center w-full bg-[#00ccb1] hover:bg-[#258376] text-lg md:text-2xl font-extrabold uppercase rounded-lg py-4 mt-5 delay-300 ease-linear transition-all"
      >
        Post {paperPlaneSVG}
      </button>
    </form>
  );
};

export default TuitionPostForm;
