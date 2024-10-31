import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "blog",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBlogsQuery } = blogApi;
