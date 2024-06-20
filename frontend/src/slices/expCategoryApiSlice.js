import { apiSlice } from "./apiSlice";
const EC_URL = '/api/expensesCategories';

export const expensesCategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setECs: builder.mutation({
            query: (data) => ({
                url: `${EC_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Expenses_Categories'],
        }),
        getECs: builder.query({
            query: () => ({
              url: EC_URL,
            }),
            providesTags: ['Expenses_Categories'],
            keepUnusedDataFor: 5,
          }),
        updateEC: builder.mutation({
            query: (data) => ({
                url: `${EC_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Expenses_Categories'],
        }),
        deleteEC: builder.mutation({
            query: (id) => ({
              url: `${EC_URL}/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Expenses_Categories'],
          }),
    })
})

export const {
    useSetECsMutation,
    useGetECsQuery,
    useUpdateECMutation,
    useDeleteECMutation
} = expensesCategoryApiSlice