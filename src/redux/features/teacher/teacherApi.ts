import { baseApi } from "../../api/baseApi";

const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: () => `/teacher`,
    }),
    getOneTeacherBYId: builder.query({
      query: (id: string) => `/teacher/profile/${id}`,
    }),
  }),
});

export const { useGetAllTeachersQuery, useGetOneTeacherBYIdQuery } = teacherApi;
