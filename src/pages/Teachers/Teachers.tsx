import { useState } from "react";
import { useGetAllTeachersQuery } from "../../redux/features/teacher/teacherApi";
import { TLocation, TParamsQuery, TTeacher } from "../Home/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { watchLoader } from "../../utils/loader";
import { PrimaryCard } from "../../components/Cards/PrimaryCard";
import { allDistrictsArray } from "../../assets/district";
import useTitle from "../../utils/useTitle";

const Teachers = () => {
  const [params, setParams] = useState<TParamsQuery[] | undefined>(undefined);
  const [option, setOption] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data: teachersData, isLoading } = useGetAllTeachersQuery(params);
  useTitle("tutors");

  const { register, handleSubmit } = useForm<TLocation>();
  const onSubmit: SubmitHandler<TLocation> = (data) => {
    const queryParams: TParamsQuery[] = [];
    queryParams.push({ name: "district", value: data.district });
    setParams(queryParams);
    setOption(data.district);
    setPageNumber(1);
  };

  const handleNextPage = () => {
    const page = teachersData.data.length < 6 ? pageNumber : pageNumber + 1;
    setPageNumber(page);
    if (option) {
      setParams([
        { name: "district", value: option },
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
        { name: "district", value: option },
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

  return (
    <div className="pt-20 mx-auto w-4/5">
      <form
        onChange={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center mb-7"
      >
        <select
          {...register("district")}
          className="select bg-slate-950 select-accent w-[300px] md:w-[500px] mx-auto"
        >
          <option disabled selected>
            Select your location
          </option>
          {allDistrictsArray.map((dis) => (
            <option key={dis} value={dis.toLowerCase()}>
              {dis}
            </option>
          ))}
        </select>
      </form>
      <div className="py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachersData.data.map((teacher: TTeacher) => (
          <PrimaryCard
            key={teacher._id}
            image={teacher.photo}
            id={teacher._id}
            name={teacher.name}
            subjects={teacher.subjects}
            description={teacher.description}
          ></PrimaryCard>
        ))}
        <p className="text-center flex justify-center items-center">
          {teachersData.data.length === 0
            ? "There are no data. Please click Previous button"
            : ""}
        </p>
      </div>
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
