import { apiSlice } from "./apiSlice";
const DASHBOARD_URL = '/api/dashboard';

export const overallStatsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setOverallStat: builder.mutation({
            query: (data) => ({
                url: `${DASHBOARD_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Dashboard'],
        }),
        getOverallStats: builder.query({
            query: () => ({
              url: DASHBOARD_URL,
            }),
            providesTags: ['Dashboard'],
            keepUnusedDataFor: 5,
          }),
        updateOverallStat: builder.mutation({
            query: (data) => ({
                url: `${DASHBOARD_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Dashboard'],
        }),
        deleteOverallStat: builder.mutation({
            query: (id) => ({
              url: `${DASHBOARD_URL}/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Dashboard'],
          }),
    })
})

export const {
    useSetOverallStatMutation,
    useGetOverallStatsQuery,
    useUpdateOverallStatMutation,
    useDeleteOverallStatMutation
} = overallStatsApiSlice