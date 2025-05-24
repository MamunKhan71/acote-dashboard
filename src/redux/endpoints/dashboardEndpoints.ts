import { CareerDetails } from "../../common/career.interface";
import { api } from "../api/api";

export const dashboardEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPostedJobs: builder.query<CareerDetails[],void>({
            query: () => ({
                url: `/api/v1/careers/get/all`,
            })
        }),
    }),
    overrideExisting: false,
});
export const { useGetAllPostedJobsQuery } = dashboardEndpoints;