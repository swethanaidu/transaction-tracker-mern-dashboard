import { apiSlice } from "./apiSlice";
const USER_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
              url: `${USER_URL}/logout`,
              method: 'POST',
            }),
        }),
        getUsers: builder.query({
            query: () => ({
              url: USER_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
          }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getUserDetails: builder.query({
            query: (id) => ({
              url: `${USER_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUserByID: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateUserMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserByIDMutation
} = usersApiSlice