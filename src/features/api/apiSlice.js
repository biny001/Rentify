import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_NODE_ENV === 'production' 
    ? 'https://rentify-5gxr.onrender.com' 
    : 'http://localhost:5000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["get-all-cars", "get-all-users", "get-history"],
  endpoints: (builder) => ({
    //user signup
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
    //user login
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-cars"],
    }),
    //add cars
    addCars: builder.mutation({
      query: (data) => ({
        url: "/user/add/car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-cars"],
    }),
    //get all cars
    getAllCars: builder.query({
      query: (arg) => `/user/get/all/cars`,
      method: "GET",
      providesTags: ["get-all-cars"],
    }),
    //get all cars
    getAllUsers: builder.query({
      query: () => "/user/get/all/users",
      providesTags: ["get-all-users"],
    }),
    //rent car
    pickCar: builder.mutation({
      query: (data) => ({
        url: "/user/rent/car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-cars"],
    }),
    //freeze and active
    freezeAndActive: builder.mutation({
      query: (data) => ({
        url: "/user/freeze/active/user",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["get-all-users", "get-all-cars"],
    }),
    //get all rent history
    getHistory: builder.query({
      query: () => "/user/get/history",
      providesTags: ["get-history"],
    }),
    //delete history
    deleteHistory: builder.mutation({
      query: (data) => ({
        url: "/user/delete/history",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["get-history"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useAddCarsMutation,
  useGetAllCarsQuery,
  usePickCarMutation,
  useGetAllUsersQuery,
  useFreezeAndActiveMutation,
  useGetHistoryQuery,
  useDeleteHistoryMutation,
} = apiSlice;
