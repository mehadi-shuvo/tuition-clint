import moment from "moment";
import { useGetAllBlogsQuery } from "../../redux/features/blog/blogApi";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery(undefined);
  if (isLoading) {
    return "loading";
  }
  const metaData = data.data.meta;
  console.log(metaData.page);

  return (
    <div>
      <div className="pt-20 w-4/5 mx-auto">
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
              className={`join-item btn ${
                Number(metaData.page) === 0
                  ? "btn-disabled disabled:bg-white"
                  : ""
              }}`}
            >
              «
            </button>
            <button className="join-item btn">
              Page {Number(data.data.meta.page) + 1}
            </button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
