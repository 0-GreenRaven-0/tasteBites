import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const recipeImageAdapter = createEntityAdapter()
const initialState = recipeImageAdapter.getInitialState({})

export const recipeImageApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
    getRecipeImages: builder.query({
        query: () => ({
            url: '/recipeImage',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            }
        }),
        transformResponse: responseData => {
            const loadedRecipeImages = responseData.map( recipeImage => {
                recipeImage.id = recipeImage._id
                return recipeImage
            })
            return recipeImageAdapter.setAll(initialState, loadedRecipeImages)
        },
        providesTags: (result, error, arg) => {
            if(result?.ids){
                return [
                    {type: 'RecipeImg', id: 'LIST'},
                    ...result.ids.map(id => (
                        {type: 'RecipeImg', id}
                    ))
                ]
            }else return[{type: 'RecipeImg', id: 'LIST'}]
        }
    }),
    uploadRecipeImage: builder.mutation({
        query: (formData) => ({
            url: '/recipeImage',
            method: 'POST',
            body: formData
        }),
        invalidatesTags: [
            {type: 'RecipeImg', id: 'LIST'}
        ]
    }),
    deleteRecipeImage: builder.mutation({
        query: (formData) => ({
            url: '/recipeImage',
            method: 'DELETE',
            body: formData
        }),
        invalidatesTags: (result, error, arg) => [
            {type: 'RecipeImg', id: arg.id}
        ]
    })
   })
})

export const {
    useGetRecipeImagesQuery,
    useUploadRecipeImageMutation,
    useDeleteRecipeImageMutation
} = recipeImageApiSlice

export const selectRecipeImgResult = (state) => 
    state.api.queries['getRecipeImages("recipeImageList")']?.data ?? initialState

export const selectRecipeImgData = (state) => 
    selectRecipeImgResult(state) ?? initialState

export const {
    selectAll: selectAllRecipeImgs,
    selectById: selectRecipeImgById,
    selectIds: selectRecipeImgIds
} = recipeImageAdapter.getSelectors(state => selectRecipeImgData(state) ?? initialState)