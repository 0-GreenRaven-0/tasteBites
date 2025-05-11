import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userImgAdapter = createEntityAdapter();
const initialState = userImgAdapter.getInitialState();

export const userImgApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserImage: builder.query({
      query: () => ({
        url: '/userImage',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: responseData => {
        const loadedprofilePics = responseData.map(profilePic => {
          profilePic.id = profilePic._id
          return profilePic
        })
        return userImgAdapter.setAll(initialState, loadedprofilePics)
      },
      providesTags: (result, error, arg) => {
        if(result?.ids){
          return [
            {type: 'UserImg', id: 'LIST'},
            ...result.ids.map(id => (
              {type: 'UserImg', id}
            ))
          ]
        }else return[{type: 'UserImg', id: 'LIST'}]
      }
    }),
    uploadImage: builder.mutation({
      query: (formdata) => ({
        url: '/userImage',
        method: 'POST',
        body: formdata
      }),
      invalidatesTags: [
        { type: "UserImg", id: 'LIST' }  // Invalidate the tag using the user ID
      ]
    }),
    editUserImage: builder.mutation({
      query: (formData) => ({
        url: '/userImage',
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "UserImg", id: arg.id }  // Invalidate the tag using the user ID
      ]
    }),
    deleteUserImg: builder.mutation({
      query: ({ id }) => ({
        url: '/userImage',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserImg', id: arg.id }
      ]
    })
  })
});

export const {
  useGetUserImageQuery,
  useUploadImageMutation,
  useEditUserImageMutation,
  useDeleteUserImgMutation
} = userImgApiSlice;


export const selectUserImgResult = (state) => 
  state.api.queries['getUserImage("profilePicsList")']?.data ?? initialState

export const selectUserImgData = (state) => 
  selectUserImgResult(state) ?? initialState

export const {
  selectAll: selectAllUserImgs,
  selectById: selectUserImgById,
  selectIds: selectUserImgIds
} = userImgAdapter.getSelectors(state => selectUserImgData(state) ?? initialState)

