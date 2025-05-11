import {useState, useEffect} from 'react'
import {useAddNewReviewMutation} from '../reviewApiSlice'
import StarRatings from 'react-star-ratings'
import useAuth from '../../../hooks/useAuth'
import './AddReview.css'

const AddReview = ({recipeId}) => {

    const {id: user} = useAuth()

    let content

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState()

    const [addReview, {
        isLoading: isAddLoading,
    }] = useAddNewReviewMutation()

    const handleRatingChange = (newRating) => {
        setRating(newRating)
    }

    const submitReview = async(e) => {
        e.preventDefault()
        try{
           await addReview({recipe: recipeId, user, rating, comment}).unwrap()
        }catch(err){
            console.error(err)
        }
    }

    let buttonState
    let canSave = true
    if(isAddLoading){
        buttonState = "Loading..."
        canSave = false
    }else{
        buttonState = "Submit"
    }


      content = (
        <form className='review-form'>
        <textarea placeholder='leave a comment...'
        onChange={(e) => setComment(e.target.value)}
        maxLength={100}
        />
        <br/>
        <div className='review-buttons'>
        <button className='review-add-button' type='button' onClick={submitReview} disabled={!canSave}>{buttonState}</button>
        <StarRatings
        starRatedColor='gold'
        starHoverColor="gold" 
        starEmptyColor='grey' 
        numberOfStars={5}
        rating={rating}
        starDimension='30px'
        changeRating={handleRatingChange}
        name="rating"
        />

        </div>
    </form>
      )
  

  return content
}

export default AddReview
