import React from "react";
import { useGetAllTeachersQuery } from "../../redux/features/teacher/teacherApi";

const Teachers = () => {
  const { data, isLoading } = useGetAllTeachersQuery("");
  console.log(data);

  return (
    <div className="pt-20 mx-auto w-4/5">
      <div className="w-full flex justify-center items-center mb-7">
        <select className="select bg-slate-950 select-accent w-[300px] md:w-[500px] mx-auto">
          <option disabled selected>
            Select your location
          </option>
          <option>Auto</option>
          <option>Dark mode</option>
          <option>Light mode</option>
          <option>Light mode</option>
          <option>Light mode</option>
          <option>Light mode</option>
          <option>Light mode</option>
          <option>Light mode</option>
        </select>
      </div>
      <div className="py-10"></div>
      <div className="w-[280px] mx-auto">
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-outline">Previous page</button>
          <button className="join-item btn btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
