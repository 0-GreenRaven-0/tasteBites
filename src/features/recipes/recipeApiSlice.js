import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const recipeAdapter = createEntityAdapter({})

const initialState = recipeAdapter.getInitialState()

export const recipeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRecipes: builder.query({
            query: () => ({
                url: '/recipe',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedRecipes = responseData.map(recipe => {
                    recipe.id = recipe._id
                    return recipe
                })
                return recipeAdapter.setAll(initialState, loadedRecipes)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Recipe', id: 'LIST'},
                        ...result.ids.map(id => (
                            {type: 'Recipe', id}
                        ))
                    ]
                } else return [{type: 'Recipe', id: 'LIST'}]
            }
        }),
        addNewRecipe: builder.mutation({
            query: initialData => ({
                url: '/recipe',
                method: 'POST',
                body:{
                    ...initialData
                }
            }),
            invalidatesTags: [
                {type: 'Recipe', id: 'LIST'}
            ]
        }),
        editRecipe: builder.mutation({
            query: initialData => ({
                url: '/recipe',
                method: 'PATCH',
                body: {
                    ...initialData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Recipe', id: arg.id}
            ]
        }),
        deleteRecipe: builder.mutation({
            query: (id) => ({
                url: '/recipe',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Recipe', id: arg.id}
            ]
        }),
        addToCollection: builder.mutation({
            query: ({userId, recipeId}) => ({
                url: '/recipe/collection',
                method: 'POST',
                body: {userId, recipeId}
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'User', id: userId }
              ]
        }),
        removeFromCollection: builder.mutation({
            query: ({userId, recipeId}) => ({
                url: '/recipe/collection',
                method: 'PATCH',
                body: {userId, recipeId}
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'User', id: userId }
              ]
        })
    })
})

export const {
    useGetRecipesQuery,
    useAddNewRecipeMutation,
    useEditRecipeMutation,
    useDeleteRecipeMutation,
    useAddToCollectionMutation,
    useRemoveFromCollectionMutation
} = recipeApiSlice

export const selectRecipesResult = (state) => 
      state.api.queries['getRecipes("recipesList")']?.data ?? initialState

export const selectRecipesData = (state) => 
    selectRecipesResult(state) ?? initialState

export const {
    selectAll: selectAllRecipes,
    selectById: selectRecipeById,
    selectIds: selectRecipeIds
} = recipeAdapter.getSelectors(state => selectRecipesData(state) ?? initialState)