import { useGetAllPostsQuery } from "../../redux/features/post/postApi";
import { watchLoader } from "../../utils/loader";
import PostCard from "../../components/Cards/PostCard";
import { TPost } from "./types";

const PostSection = () => {
  const { data: tuitions, isLoading } = useGetAllPostsQuery(undefined);
  if (isLoading) {
    return <div>{watchLoader}</div>;
  }

  return (
    <div className="py-20">
      <div>
        <h1 className="mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00ccb1] to-pink-500 text-4xl font-extrabold tracking-widest secondary-font">
          Tuitions
        </h1>
        <div className="border-b-4 border-slate-950 mb-10"> </div>
      </div>
      <div className="w-4/5 mx-auto grid gap-4 md:grid-cols-2">
        {tuitions.data.map((tui: TPost) => (
          <PostCard key={tui._id} post={tui} />
        ))}
      </div>
    </div>
  );
};

export default PostSection;
