import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.imgbb.com/1/",
    // credentials: "include",
  }),
  endpoints: (builder) => ({
    postImage: builder.mutation({
      query: (imageFile) => {
        // Prepare form data
        const formData = new FormData();
        formData.append("image", imageFile);

        return {
          url: "upload?key=21897cb44b377f386ccb3fa22c86f096", // Replace YOUR_API_KEY with your actual ImgBB API key
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { usePostImageMutation } = imageApi;
