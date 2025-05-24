import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginData, IResponse } from "../../common/common.interface";

const baseUrl = "http://192.168.9.205:5090";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Authorization Header:", headers.get("Authorization"));
      }
      return headers;
    }
  }),
  tagTypes: ["Post", "User", "products", "category", "order"],
  endpoints: (builder) => ({
    getInitialToken: builder.query<ILoginData, void>({
      query: () => ({
        url: "/api/v1/auth/admin",
      }),
    }),
    createUser: builder.mutation<IResponse<ILoginData>, { email: string; name: string; password: string }>({
      query: (body) => ({
        url: "/api/v1/auth/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetInitialTokenQuery, useCreateUserMutation } = api;
