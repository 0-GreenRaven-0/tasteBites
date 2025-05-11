import {useState, useEffect} from 'react'
import { useEditReviewMutation, useDeleteReviewMutation } from '../reviewApiSlice'
import useAuth from '../../../hooks/useAuth'
import StarRatings from 'react-star-ratings'
import './EditReview.css'

const EditReview = ({review, recipe, setEditMode}) => {

  const {id: userId} = useAuth()

  const [rating, setRating] = useState(review.rating)
  const [comment,  setComment] = useState(review.comment)

  const [editReview, {
    isSuccess: isEditSuccess,
    isLoading: isEditLoading,
    isError: isEditError,
    error: editError
  }] = useEditReviewMutation()

  const [deleteReview, {
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    error: deleteError
  }] = useDeleteReviewMutation()

  const handleEdit = async(e) => {
    e.preventDefault()
    try{
      await editReview({id: review.id, recipe, user: userId, comment, rating}).unwrap()
    }catch(err){
        console.log(err)
    }
  }

  const handleDelete = async(e) => {
    e.preventDefault()
    try{
      await deleteReview(review.id).unwrap()
    }catch(err){
        console.log(err)
    }
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
}

  
    return (
      <div className='review'>
   
        <form>
            <textarea 
            className='review-input'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            maxLength={100}
            />
            <br/>

                    <div className='edit-review-btn-container'>
                    <StarRatings
                    starRatedColor='gold'
                    starHoverColor="gold"  
                    numberOfStars={5}
                    rating={rating}
                    changeRating={handleRatingChange}
                    name="rating"
                    />
                    &nbsp;
                    <button className='edit-review-btn' onClick={handleEdit}>Save</button>
                    &nbsp;
                    <button className='edit-review-btn' onClick={handleDelete}>Delete</button>
                    &nbsp;
                    <button className='edit-review-btn' onClick={(e) => setEditMode(prev => !prev)}>Cancel</button>
                    </div>
                    
        </form>
      </div>
    )
  }
   

export default EditReview
