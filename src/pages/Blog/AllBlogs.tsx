import moment from "moment";
import { useGetAllBlogsQuery } from "../../redux/features/blog/blogApi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TParamsQuery } from "../Home/types";
import { SubmitHandler, useForm } from "react-hook-form";

type TBlogSearchQuery = {
  queryKey: string;
};

const AllBlogs = () => {
  const [params, setParams] = useState<TParamsQuery[] | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetAllBlogsQuery(params);
  const { register, handleSubmit } = useForm<TBlogSearchQuery>();
  const searchHandler: SubmitHandler<TBlogSearchQuery> = (query) => {
    setSearchQuery(query.queryKey);
    setParams([
      { name: "searchKey", value: searchQuery },
      { name: "page", value: 0 },
    ]);
  };

  if (isLoading) {
    return "loading";
  }
  const metaData = data.data.meta;
  // console.log({ metaData });

  const nextHandler = () => {
    if (
      searchQuery &&
      Number(metaData.totalPages) > Number(metaData.page) + 1
    ) {
      setParams([
        { name: "searchKey", value: searchQuery },
        { name: "page", value: Number(metaData.page) + 1 },
      ]);
    } else if (Number(metaData.totalPages) > Number(metaData.page) + 1) {
      setParams([{ name: "page", value: Number(metaData.page) + 1 }]);
    }
  };
  const prevHandler = () => {
    if (
      searchQuery &&
      Number(metaData.page) > 0 &&
      Number(metaData.page) + 1 <= Number(metaData.totalPages)
    ) {
      setParams([
        { name: "searchKey", value: searchQuery },
        { name: "page", value: Number(metaData.page) - 1 },
      ]);
    } else if (
      Number(metaData.page) > 0 &&
      Number(metaData.page) + 1 <= Number(metaData.totalPages)
    ) {
      setParams([{ name: "page", value: Number(metaData.page) - 1 }]);
    }
  };

  return (
    <div>
      <div className="pt-20 w-4/5 mx-auto">
        <form
          onSubmit={handleSubmit(searchHandler)}
          className="w-full h-10 mt-5 mb-10"
        >
          <div className="w-[300px] mx-auto">
            <label className="relative">
              <input
                className="w-full text-slate-800 pl-10 py-1 outline-none"
                {...register("queryKey")}
                placeholder="ex: science"
                type="text"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={handleSubmit(searchHandler)}
                className="size-6 absolute left-1 -top-[3px] z-10 text-slate-700 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </label>
          </div>
        </form>
        {data.data.blogs.map((blog: any) => (
          <div className="md:flex secondary-bg gap-5 mb-10" key={blog._id}>
            <img
              className="w-96"
              src="https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="blog-image"
            />
            <div className="p-5 flex flex-col justify-between">
              <Link to={`blog/${blog._id}`}>
                <h1 className="text-xl md:text-2xl font-medium mb-3">
                  {blog.title}
                </h1>
                <p className="mb-5">{blog.blog.slice(0, 120)}...</p>
              </Link>
              <div className="w-full border-t-2 border-white text-sm pt-1 md:flex justify-between items-center">
                <div className="md:flex gap-4 items-center">
                  <p className="italic capitalize">by {blog.userName}</p>
                  <div className="flex items-center gap-3 justify-between">
                    <span className="normal-case">
                      {moment(blog.createdAt).toNow(true)} ago
                    </span>
                    <span className="pl-3 normal-case flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4 mb-1"
                      >
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path
                          fillRule="evenodd"
                          d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="block">{blog.views}</span>
                    </span>
                  </div>
                </div>
                <Link
                  className="block brand-text-color px-1 border-b-[1px] border-[#00ccb1] mt-5 md:mt-0 text-center"
                  to={`blog/${blog._id}`}
                >
                  See more
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center">
          <div className="join">
            <button
              onClick={() => prevHandler()}
              className={`join-item btn ${
                Number(metaData.page) === 0 && "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </button>
            <button className="join-item btn">
              Page {Number(data.data.meta.page) + 1}
            </button>
            <button
              onClick={() => nextHandler()}
              className={`join-item btn ${
                Number(metaData.totalPages) === Number(metaData.page) + 1 &&
                "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
