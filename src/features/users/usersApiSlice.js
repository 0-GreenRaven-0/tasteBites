import { createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                })
                return usersAdapter.setAll(initialState, loadedUsers);

            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => (
                            {type: 'User', id}
                        ))
                    ]
                } else return [{type: 'User', id: 'LIST'}]
            }
        }),
        addNewUser: builder.mutation({
            query: userData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...userData
                }
            }),
            invalidatesTags: [
                {type: 'User', id: 'LIST'}
            ]
        }),
        updateUser: builder.mutation({
            query: userData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...userData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/users/forgot-password',
                method: 'POST',
                body: {email}
            })
        }),
        updatePassword: builder.mutation({
            query: (resetData) => ({
                url: '/users/update-password',
                method: 'PATCH',
                body: {
                    ...resetData
                }
            })
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/users',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        })
    })
})


export const {
   useGetUsersQuery,
   useAddNewUserMutation,
   useUpdateUserMutation,
   useDeleteUserMutation,
   useForgotPasswordMutation,
   useUpdatePasswordMutation
} = usersApiSlice

export const selectUsersResult = (state) => 
    state.api.queries['getUsers("usersList")']?.data ?? initialState;

export const selectUsersData = (state) =>
    selectUsersResult(state) ?? initialState;
  

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)