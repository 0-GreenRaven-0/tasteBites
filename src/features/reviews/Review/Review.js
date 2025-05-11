import { useState } from 'react'
import { useGetReviewsQuery } from '../reviewApiSlice'
import StarRatings from 'react-star-ratings'
import {selectAllUsers} from '../../users/usersApiSlice'
import { useSelector } from 'react-redux'
import EditReview from '../EditReview/EditReview'
import useAuth from '../../../hooks/useAuth'
import './Review.css'

const Review = ({reviewId, recipeId}) => {

  const {username, id} = useAuth()

  const [editMode, setEditMode] = useState(false)
  const userData = useSelector(selectAllUsers)


    const {review} = useGetReviewsQuery("reviewsList", {
        selectFromResult: ({data}) => ({
            review: data?.entities[reviewId]
        })
    })

    const foundUser = userData.find(user => user._id === review.user)

    if (!review || !foundUser) return null;

    let content

      if(editMode){
        content = (
          <EditReview review={review} recipe={recipeId} editMode={editMode} setEditMode={setEditMode}/>
        )
      }else{
        content = (
          <div className='review'>
            <h3>{foundUser?.username}</h3>
            {content}
            <StarRatings 
            rating={review.rating}
            starRatedColor='yellow'
            starEmptyColor='grey'
            className='user-rating'
            />
            <p>{review.comment}</p>
           {username === foundUser.username && <button className='edit-review-btn' onClick={(e) => setEditMode(prev => !prev)}>Edit</button>}
            </div>
        )
      }

      return content
   
}

export default Review
