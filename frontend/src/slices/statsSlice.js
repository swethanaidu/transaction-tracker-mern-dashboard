import { apiSlice } from "./apiSlice";
const STATS_URL = '/api/stats';

export const statsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getMonthlyStatsData: builder.query({
            query: () => ({
              url: `${STATS_URL}/getMonthlyData`,
            }),
            providesTags: ['Stats'],
            keepUnusedDataFor: 5,
          }),
          getBarChartStatsData: builder.query({
            query: () => ({
                url: `${STATS_URL}/getBarChartData`,
            }),
            providesTags: ['Stats'],
            keepUnusedDataFor: 5,
          }),
         
    })
})

export const {
    useGetMonthlyStatsDataQuery,
    useGetBarChartStatsDataQuery
} = statsApiSlice