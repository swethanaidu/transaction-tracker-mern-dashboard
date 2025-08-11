import { apiSlice } from "./apiSlice";
const DEBT_URL = '/api/debts';

export const debtApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setDebt: builder.mutation({
            query: (data) => ({
                url: `${DEBT_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Debts'],
        }),
        getDebts: builder.query({
            query: () => ({
              url: DEBT_URL,
            }),
            providesTags: ['Debts'],
            keepUnusedDataFor: 5,
          }),
        updateDebt: builder.mutation({
            query: (data) => ({
                url: `${DEBT_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Debts'],
        }),
        deleteDebt: builder.mutation({
            query: (id) => ({
              url: `${DEBT_URL}/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Debts'],
          }),
    })
})

export const {
    useSetDebtMutation,
    useGetDebtsQuery,
    useUpdateDebtMutation,
    useDeleteDebtMutation
} = debtApiSlice