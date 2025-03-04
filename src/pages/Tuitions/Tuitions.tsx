import { useState } from "react";
import {
  useGetAllPostsQuery,
  useGetThanasQuery,
} from "../../redux/features/post/postApi";
import { SubmitHandler, useForm } from "react-hook-form";
import PostCard from "../../components/Cards/PostCard";
import { TLocation, TParamsQuery, TPost } from "../Home/types";
import { watchLoader } from "../../utils/loader";
import { allDistrictsArray } from "../../assets/district";
import { searchSVG } from "../../assets/svgs/localSVGs";
import useTitle from "../../utils/useTitle";

const Tuitions = () => {
  const [params, setParams] = useState<TParamsQuery[] | undefined>(undefined);
  const [paramsDistrict, setParamsDistrict] = useState<
    TParamsQuery[] | undefined
  >(undefined);
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data: thanas } = useGetThanasQuery(paramsDistrict);
  const { data: postData, isLoading } = useGetAllPostsQuery(params);
  useTitle("Tuitions");

  const handleDistrict = (value: string) => {
    const queryParams: TParamsQuery[] = [];
    queryParams.push({ name: "district", value: value });
    setParamsDistrict(queryParams);
  };

  const { register, handleSubmit } = useForm<TLocation>();
  const onSubmit: SubmitHandler<TLocation> = (data) => {
    const queryParams: TParamsQuery[] = [];
    queryParams.push(
      { name: "district", value: data.district },
      { name: "thana", value: data.thana }
    );

    setParams(queryParams);
    setDistrict(data.district);
    setThana(data.thana);
    setPageNumber(1);
  };

  const handleNextPage = () => {
    const page = postData.data.length < 6 ? pageNumber : pageNumber + 1;
    setPageNumber(page);
    if (district && thana) {
      setParams([
        { name: "district", value: district },
        { name: "thana", value: thana },
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
    if (district && thana) {
      setParams([
        { name: "district", value: district },
        { name: "thana", value: thana },
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
  // console.log(postData);
  return (
    <div className="pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-3 w-4/5 mx-auto flex flex-col lg:flex-row gap-3 md:gap-5 justify-start items-center my-7"
      >
        <div className="grid grid-cols-2 lg:flex justify-start items-center gap-3 w-full">
          <select
            {...register("district")}
            className="rounded-md py-2 px-1 md:px-3 text-black bg-white"
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
            {...register("thana")}
            className="rounded-md py-2 px-1 md:px-3 text-black bg-white"
          >
            <option disabled selected>
              Select Thana
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
        <button
          type="submit"
          className="text-center px-5 py-1 rounded-md text-lg bg-[#00ccb1] flex items-center  gap-3"
        >
          {searchSVG} Search
        </button>
      </form>
      <div className="py-10 w-4/5 mx-auto grid gap-4 md:grid-cols-1">
        {postData.data.map((itm: TPost) => (
          <PostCard key={itm._id} post={itm}></PostCard>
        ))}
        <p className="text-center flex justify-center items-center">
          {postData.data.length === 0
            ? "There are no data. Please click Previous button"
            : ""}
        </p>
      </div>
      {/* pagination buttons */}
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

export default Tuitions;
