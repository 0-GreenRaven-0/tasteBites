import React from 'react'
import './Recipe.css'
import { useGetRecipesQuery } from '../recipeApiSlice'
import { useGetRecipeImagesQuery } from '../../recipeImages/recipeImageApiSlice'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../users/usersApiSlice'
import ManageCollection from '../Collection/ManageCollection'
import defaultRecipeImg from './Default Recipe Img.png'
import useAuth from '../../../hooks/useAuth'

const Recipe = ({recipeId}) => {

  const isMobile = window.innerWidth <= 480;

  const {id} = useAuth()

  const {recipe} = useGetRecipesQuery("recipesList", {
    selectFromResult: ({data}) => ({
        recipe: data?.entities[recipeId]
    })
  })

  const {
    data: images,
    isSuccess,
    isLoading,
    isError,
    error 
  } = useGetRecipeImagesQuery('recipeImageList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  }) 

  const user = useSelector(selectAllUsers).filter(user => user._id === recipe.user)
  let username = " "
  let recipeImage
  if (isSuccess) {
    const { entities } = images;

    username = user[0]?.username
  
    const filteredImages = Object.values(entities).filter(image => image.recipe === recipeId);
    
    if(filteredImages.length){
      recipeImage = (
        <img className='recipe-image' width={200} height={200} src={filteredImages[0].url}/>
      )
    }else{
      recipeImage = (
        <img className='recipe-image' width={200} height={200} src={defaultRecipeImg}/>
      )
    }
  }
  
  return (
    <div className='recipe'>
      {id && <ManageCollection userId={id} recipeId={recipeId}/>}
        {recipeImage}
        <h2 className='recipe-card-name'>{recipe.name}</h2>
        <h4 className='recipe-owner'>by {username}</h4>
      
        <br/>
        <span  className='recipe-rating'>     
      <StarRatings 
      rating={recipe.overAllRating}
      starRatedColor='yellow'
      /></span>
     
        <div className='recipe-info'>Difficulty: {recipe.difficulty}</div>
        <div className='recipe-info'>Cuisine: {recipe.cuisine}</div>
        <div className='recipe-tag-list'>
        {recipe.tags.map(tag => (
          <span className='recipe-tag' key={tag}>#{tag}</span>
        ))}
      </div>
        <br/>
        <Link className='view-recipe' to={`/myRecipes/viewRecipe/${recipeId}`}>Read More</Link>
    </div>
  )
}

export default Recipe
