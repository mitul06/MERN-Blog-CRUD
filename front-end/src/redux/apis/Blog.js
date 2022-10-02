import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_HOST_API_KEY;

export const BlogsApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => {
        return {
          url: "blogs/all",
          method: "GET",
        };
      },
    }),

    createBlog: builder.mutation({
      query: (data) => {
        return {
          url: "blogs/add",
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getBlog: builder.query({
      query: (id) => {
        return {
          url: `blogs/get/${id}`,
          method: "GET",
        };
      },
    }),

    updateBlog: builder.mutation({
      query: (data) => {
        return {
          url: `blogs/update/${data?.id}`,
          method: "PATCH",
          body: data?.updateData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} = BlogsApi;
