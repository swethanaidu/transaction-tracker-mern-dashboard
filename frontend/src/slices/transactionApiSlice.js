import { apiSlice } from "./apiSlice";
const TRANSACTION_URL = '/api/transactions';

export const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setTransaction: builder.mutation({
            query: (data) => ({
                url: `${TRANSACTION_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Transaction'],
        }),
        getTransactions: builder.query({
            query: () => ({
              url: TRANSACTION_URL,
            }),
            providesTags: ['Transaction'],
            keepUnusedDataFor: 5,
          }),
        updateTransaction: builder.mutation({
            query: (data) => ({
                url: `${TRANSACTION_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Transaction'],
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
              url: `${TRANSACTION_URL}/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Transaction'],
          }),
    })
})

export const {
    useSetTransactionMutation,
    useGetTransactionsQuery,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation
} = transactionApiSlice