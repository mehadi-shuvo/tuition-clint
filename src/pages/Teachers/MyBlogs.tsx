import { useParams } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useGetUserBlogsQuery,
} from "../../redux/features/blog/blogApi";
import moment from "moment";
import { useGetOneTeacherBYIdQuery } from "../../redux/features/teacher/teacherApi";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const { id } = useParams();
  const { data: teacherInfo } = useGetOneTeacherBYIdQuery(id as string);
  const [deleteBlog] = useDeleteBlogMutation();
  const { data, isLoading, refetch } = useGetUserBlogsQuery(
    teacherInfo.data._id as string
  );

  const deleteBlogHandler = async (id: string) => {
    const res: any = await deleteBlog({ id });
    if (res.data.success) {
      refetch();
      toast.success("Blog deleted successfully");
    }
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="w-4/5 mx-auto mt-20">
      {data.data.map((blog: any) => (
        <div className="secondary-bg mb-10 p-5 relative" key={blog._id}>
          <h1 className="text-xl md:text-2xl font-medium mb-3">{blog.title}</h1>
          <div className="w-full border-b-2 border-white text-sm pb-1 md:flex justify-between items-center mb-5">
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
          </div>
          <img
            className="w-full h-[400px]"
            src={blog.bannerPhoto}
            alt="blog-image"
          />
          <p className="mt-10">{blog.blog}</p>
          <button
            className="text-[#ff3232] mt-5 bg-transparent p-3 rounded-full absolute -top-4 right-1"
            onClick={() => deleteBlogHandler(blog._id)}
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyBlogs;
