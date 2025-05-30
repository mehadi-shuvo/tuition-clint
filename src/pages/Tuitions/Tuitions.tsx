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
        className="px-3 w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-5 justify-start items-center my-7"
      >
        {/* Glass Morphism Container */}
        <div className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-800/50 rounded-xl p-6 shadow-2xl flex flex-col lg:flex-row gap-5 items-center">
          {/* District and Thana Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex justify-start items-center gap-4 w-full">
            {/* District Select */}
            <div className="relative w-full">
              <select
                {...register("district")}
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-lg appearance-none focus:outline-none focus:border-accent-500 transition-all cursor-pointer text-white hover:border-accent-500 focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50"
                onChange={(e) => handleDistrict(e.target.value)}
              >
                <option disabled selected className="text-slate-400">
                  Select District
                </option>
                {allDistrictsArray.sort().map((dis) => (
                  <option
                    className="capitalize bg-slate-900 hover:bg-accent-500 hover:text-white"
                    key={dis}
                    value={dis.toLowerCase()}
                  >
                    {dis}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Thana Select */}
            <div className="relative w-full">
              <select
                {...register("thana")}
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-lg appearance-none focus:outline-none focus:border-accent-500 transition-all cursor-pointer text-white hover:border-accent-500 focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50"
              >
                <option disabled selected className="text-slate-400">
                  Select Thana
                </option>
                {thanas?.data?.thanas.map((tha: string) => (
                  <option
                    className="capitalize bg-slate-900 hover:bg-accent-500 hover:text-white"
                    key={tha}
                    value={tha.toLowerCase()}
                  >
                    {tha}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-lg bg-[#00ccb1] hover:bg-[#00a892] text-white flex items-center gap-3 transition-all transform hover:scale-105 focus:ring-2 focus:ring-[#00ccb1] focus:ring-opacity-50 shadow-lg w-full lg:w-auto"
          >
            {searchSVG} Search
          </button>
        </div>
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
