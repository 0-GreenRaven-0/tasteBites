import React from 'react'
import {useGetReviewsQuery} from './reviewApiSlice'
import Review from './Review/Review'
import useAuth from '../../hooks/useAuth'

const ReviewList = ({recipeId}) => {

  const {id: userId} = useAuth()

  let content

  const {
    data: reviews,
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetReviewsQuery('reviewsList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  if(isSuccess) {
    const {ids, entities} = reviews
    let filteredIds
    if (ids?.length) {
      filteredIds = ids
        .filter(id => entities[id].recipe === recipeId)
        .sort((a, b) => {
          const isAUser = entities[a].user === userId
          const isBUser = entities[b].user === userId
          return isAUser === isBUser ? 0 : isAUser ? -1 : 1
        })

        if(filteredIds.length){
      content = (
        <div>
          <ul>
            {filteredIds.map( reviewId => (
              <li key={reviewId}>
               <Review reviewId={reviewId} recipeId={recipeId} />
              </li>
            ))}
          </ul>
        </div>
      )
        }else{
        content = (
           <div>
            <h2>You are not logged in!</h2>
            <p>Create your account or log in to your exisitig one to add reviews on other people's recipes</p>
           </div>
        )
    }

    }
  }

  if(isLoading) {
    content = <p>Loading the reviews...</p>
  }

  if(isError) {
    content = (
      <div>
        <p>An error has occurred while fetching the reviews...</p>
        <p>{error?.data?.message}</p>
      </div>
    )
  }

  return content
}

export default ReviewList
