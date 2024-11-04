import { baseApi } from "../../api/baseApi";

type TId = { id: string };

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (queryParams) => {
        const params = new URLSearchParams();
        if (queryParams) {
          queryParams.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "blog",
          method: "GET",
          params,
        };
      },
    }),
    getBlog: builder.query({
      query: (id: string) => {
        return {
          url: `blog/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetBlogQuery } = blogApi;
