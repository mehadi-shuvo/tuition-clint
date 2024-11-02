import { baseApi } from "../../api/baseApi";

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
  }),
});

export const { useGetAllBlogsQuery } = blogApi;
