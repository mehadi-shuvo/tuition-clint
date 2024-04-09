import React, { useState } from "react";
import { useGetAllTeachersQuery } from "../../redux/features/teacher/teacherApi";
import { TLocation, TParamsQuery } from "../Home/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { watchLoader } from "../../utils/loader";

const Teachers = () => {
  const [params, setParams] = useState<TParamsQuery[] | undefined>(undefined);
  const [option, setOption] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data: teachersData, isLoading } = useGetAllTeachersQuery(params);

  const { register, handleSubmit } = useForm<TLocation>();
  const onSubmit: SubmitHandler<TLocation> = (data) => {
    const queryParams: TParamsQuery[] = [];
    queryParams.push({ name: "location", value: data.location });
    setParams(queryParams);
    setOption(data.location);
  };

  const handleNextPage = () => {
    const page = teachersData.data.length === 2 ? pageNumber + 1 : pageNumber;
    setPageNumber(page);
    if (option) {
      setParams([
        { name: "location", value: option },
        { name: "page", value: page },
      ]);
    } else {
      setParams([{ name: "page", value: page }]);
    }
  };
  const handlePrivPage = () => {
    const page = pageNumber > 1 ? pageNumber - 1 : 1;
    console.log(page);

    setPageNumber(page);
    if (option) {
      setParams([
        { name: "location", value: option },
        { name: "page", value: page },
      ]);
    } else {
      setParams([{ name: "page", value: page }]);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }
  console.log(teachersData);

  return (
    <div className="pt-20 mx-auto w-4/5">
      <form
        onChange={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center mb-7"
      >
        <select
          {...register("location")}
          className="select bg-slate-950 select-accent w-[300px] md:w-[500px] mx-auto"
        >
          <option disabled selected>
            Select your location
          </option>
          <option value={"mirpur"}>Mirpur</option>
          <option value={"dhaka"}>Dhaka</option>
        </select>
      </form>
      <div className="py-10"></div>
      <div className="w-[280px] mx-auto">
        <div className="join grid grid-cols-2">
          <button
            onClick={handlePrivPage}
            className="join-item btn btn-outline"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="join-item btn btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
