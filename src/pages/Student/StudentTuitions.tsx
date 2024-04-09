import {
  useDeleteSinglePostMutation,
  useGetSingleUserPostsQuery,
} from "../../redux/features/post/postApi";
import { watchLoader } from "../../utils/loader";
import { TPost } from "../Home/types";
import { XMarkSVG } from "../../assets/svgs/localSVGs";
import Swal from "sweetalert2";

const StudentTuitions = ({ id }: { id: string }) => {
  const { isLoading, data, refetch } = useGetSingleUserPostsQuery(id);
  const [deletePost] = useDeleteSinglePostMutation();

  if (isLoading) {
    return (
      <div className="w-ful flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  const handelDeletePost = (postId: string) => {
    Swal.fire({
      title: "You are going to delete this post. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(postId);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 w-4/5 mx-auto mt-10">
      {data.data.map((post: TPost) => (
        <div
          key={post._id}
          className="bg-white p-1 rounded-lg hover:bg-[#00ccb1] hover:shadow-md hover:shadow-[#00ccb1] transition-all ease-linear delay-200 relative"
        >
          <div className="bg-slate-950 rounded-lg p-3">
            <p>{post.title}</p>
            <p>{post.class}</p>
            <p>{post.description}</p>
          </div>
          <button
            onClick={() => handelDeletePost(post._id)}
            className="absolute top-1 right-1  bg-red-500 p-1 rounded-lg"
          >
            {XMarkSVG}
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentTuitions;
