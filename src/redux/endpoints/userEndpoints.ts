import { IAdmin, IAdminRegisterValue, IAdminResponse, ILoginData, ILoginValue, IResponse } from "../../common/common.interface";
import { api } from "../api/api";

export const userEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN USER
    loginUser: builder.mutation<ILoginData, ILoginValue>({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.query<IResponse<{ admin: IAdmin }>, void>({
      query: () => ({
        url: "/api/v1/auth/admin",
      }),
    }),
    createAdmin: builder.mutation<IResponse<IAdminResponse>, IAdminRegisterValue>({
      query: (body) => ({
        url: `/api/v1/auth/create`,
        method: "POST",
        body
      })
    })
  }),
});

export const { useLoginUserMutation, useRefreshTokenQuery, useCreateAdminMutation } = userEndpoints;
