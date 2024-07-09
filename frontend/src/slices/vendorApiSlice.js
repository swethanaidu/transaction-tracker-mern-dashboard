import { apiSlice } from "./apiSlice";
const VENDOR_URL = '/api/vendor';

export const vendorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setVendor: builder.mutation({
            query: (data) => ({
                url: `${VENDOR_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Vendor'],
        }),
        getVendors: builder.query({
            query: () => ({
              url: VENDOR_URL,
            }),
            providesTags: ['Vendor'],
            keepUnusedDataFor: 5,
          }),
        updateVendor: builder.mutation({
            query: (data) => ({
                url: `${VENDOR_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Vendor'],
        }),
        deleteVendor: builder.mutation({
            query: (id) => ({
              url: `${VENDOR_URL}/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Vendor'],
          }),
    })
})

export const {
    useSetVendorMutation,
    useGetVendorsQuery,
    useUpdateVendorMutation,
    useDeleteVendorMutation
} = vendorApiSlice