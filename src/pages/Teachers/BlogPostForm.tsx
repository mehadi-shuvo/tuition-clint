import { useParams } from "react-router-dom";
import { useGetOneTeacherBYIdQuery } from "../../redux/features/teacher/teacherApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { imageHosting } from "../../utils/imageHosting";
import { useCreateBlogMutation } from "../../redux/features/blog/blogApi";
import toast from "react-hot-toast";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  blog: z.string().min(2, "Blog content must be at least 20 characters"),
  keyWords: z.array(z.string()).min(1, "At least one keyword is required"),
  bannerPhoto: z.string().optional(),
});

type BlogFormData = z.infer<typeof schema>;

const BlogPostForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm<BlogFormData>({
    resolver: zodResolver(schema),
  });
  const [keywords, setKeywords] = useState<string[]>([]);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [createBlog] = useCreateBlogMutation();
  const { data: teacherInfo, isLoading } = useGetOneTeacherBYIdQuery(
    id as string
  );

  const addKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      event.preventDefault();
      setKeywords([...keywords, event.currentTarget.value]);
      setValue("keyWords", [...keywords, event.currentTarget.value]);
      event.currentTarget.value = "";
    }
  };

  const removeKeyword = (keyword: string) => {
    const updatedKeywords = keywords.filter((k) => k !== keyword);
    setKeywords(updatedKeywords);
    setValue("keyWords", updatedKeywords);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const bannerData = new FormData();
    bannerData.append("image", file as Blob);
    const imgInfo: any = await imageHosting(bannerData);
    if (file && imgInfo && imgInfo?.data) {
      setBannerPreview(URL.createObjectURL(file));
      setValue("bannerPhoto", imgInfo!.data.display_url);
    }
  };

  // console.log(watch);
  const onSubmit = async (data: BlogFormData) => {
    let blogData;
    if (teacherInfo) {
      blogData = {
        ...data,
        userId: teacherInfo.data._id,
        userName: teacherInfo.data.name,
        photo: teacherInfo.data.photo,
      };
    }

    const result: any = await createBlog(blogData);

    if (result.data.success) {
      console.log({ result: result.data.success });
      toast.success("Blog created successfully");
      reset();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pt-20 pb-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 mx-auto p-6 bg-white shadow-lg rounded-xl text-slate-800"
      >
        <h2 className="text-2xl font-bold text-[#00ccb1] mb-4">
          Create a Blog
        </h2>

        <label className="block text-gray-700">Title</label>
        <input
          {...register("title")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ccb1]"
        />

        <label className="block text-gray-700 mt-4">Blog Description</label>
        <textarea
          {...register("blog")}
          className="w-full p-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-[#00ccb1]"
        />

        <label className="block text-gray-700 mt-4">Keywords</label>
        <input
          type="text"
          onKeyDown={addKeyword}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ccb1]"
          placeholder="Press Enter to add"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-[#00ccb1] text-white px-3 py-1 rounded-full text-sm"
            >
              {keyword}{" "}
              <button
                type="button"
                className="ml-1 text-white"
                onClick={() => removeKeyword(keyword)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <label className="block text-gray-700 mt-4">Banner Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
        />
        {bannerPreview && (
          <img
            src={bannerPreview}
            alt="Banner Preview"
            className="mt-2 w-full rounded-md"
          />
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-[#00ccb1] text-white py-2 rounded-md hover:bg-[#009b8e] transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogPostForm;
