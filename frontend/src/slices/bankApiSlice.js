import { apiSlice } from "./apiSlice";
const BANK_URL = '/api/bank';

export const bankApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setBank: builder.mutation({
            query: (data) => ({
                url: `${BANK_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Bank'],
        }),
        getBanks: builder.query({
            query: () => ({
              url: BANK_URL,
            }),
            providesTags: ['Bank'],
            keepUnusedDataFor: 5,
          }),
        updateBank: builder.mutation({
            query: (data) => ({
                url: `${BANK_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Bank'],
        }),
        deleteBank: builder.mutation({
            query: (id) => ({
              url: `${BANK_URL}/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Bank'],
          }),
    })
})

export const {
    useSetBankMutation,
    useGetBanksQuery,
    useUpdateBankMutation,
    useDeleteBankMutation
} = bankApiSlice