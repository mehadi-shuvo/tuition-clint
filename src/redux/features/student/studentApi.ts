import { baseApi } from "../../api/baseApi";

const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "student",
        method: "POST",
        body: data,
      }),
    }),
    getOneStudentById: builder.query({
      query: (email) => ({
        url: `/student/email/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateStudentMutation, useGetOneStudentByIdQuery } =
  teacherApi;
