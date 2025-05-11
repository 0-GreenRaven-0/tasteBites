import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const reviewAdapter = createEntityAdapter({})

const initialState = reviewAdapter.getInitialState()

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: () => ({
                url: '/review',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedReviews = responseData.map(review => {
                    review.id = review._id
                    return review
                })
               return reviewAdapter.setAll(initialState, loadedReviews) 
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Review', id: 'LIST'},
                        ...result.ids.map(id => (
                            {type: 'Review', id}
                        ))
                    ]
                }else return [{type: 'Review', id: 'LIST'}]
            }
        }),
        addNewReview: builder.mutation({
            query: initialData => ({
                url: '/review',
                method: 'POST',
                body: {
                    ...initialData
                }
            }),
            invalidatesTags: [
                {type: 'Review', id: 'LIST'}
            ]
        }),
        editReview: builder.mutation({
            query: initialData => ({
                url: '/review',
                method: 'PATCH',
                body: {
                    ...initialData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Review', id: arg.id}
            ]
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: '/review',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Review', id: arg.id}
            ]
        })
    })
})

export const {
   useGetReviewsQuery,
   useAddNewReviewMutation,
   useEditReviewMutation,
   useDeleteReviewMutation
} = reviewApiSlice

export const selectReviewsResult = (state) => 
    state.api.queries['getReviews("reviewsList")']?.data ?? initialState

export const selectReviewsData = (state) => 
    selectReviewsResult(state) ?? initialState

export const {
    selectAll: selectAllReviews,
    selectById: selectReviewById,
    selectIds: selectReviewId
} = reviewAdapter.getSelectors(state => selectReviewsData(state) ?? initialState)