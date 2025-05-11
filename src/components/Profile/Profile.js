import defaultImage from '../Settings/default-avatar.png'
import {selectAllRecipeImgs} from '../../features/recipeImages/recipeImageApiSlice'
import StarRatings from 'react-star-ratings'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultRecipeImg from './Default Recipe Img.png'
import Theme from '../Utility/Theme/Theme'
import './Profile.css'

const Profile = ({user, profileImage, userRecipes}) => {

  let content

  const recipeImages = useSelector(selectAllRecipeImgs)

  let recipes
  if(userRecipes.length){
    recipes = (
    <>
      {userRecipes.map(recipe =>{
         const filteredImages = recipeImages.filter(image => image.recipe === recipe.id)
         let recipeImage

        filteredImages.length ? recipeImage = filteredImages[0].url : recipeImage = defaultRecipeImg
        return (
          <div className='recipe at-profile-page' key={recipe.id}>
                <img className='recipe-image' width={200} height={200} src={recipeImage}/>
          <h2 className='recipe-card-name'>{recipe.name}</h2>

          <br/>
          <span  className='recipe-rating'>     
          <StarRatings 
          rating={recipe.overAllRating}
          starDimension='25px'
          starRatedColor='yellow'
          /></span>

          <div className='recipe-info'>Difficulty: {recipe.difficulty}</div>
          <div className='recipe-info'>Cuisine: {recipe.cuisine}</div>
          <div className='recipe-tag-list'>
          {recipe.tags.map(tag => (
            <span className='recipe-tag'>#{tag}</span>
          ))}
          </div>
          <br/>
              <Link className='view-recipe' to={`/myRecipes/viewRecipe/${recipe.id}`}>Read More</Link>
          </div>
      )
      })}
    </>
  );
  }else{
    recipes = (
    <h2>This Bitch hasn't created any recipe yet</h2>
    )
  }
  if(!user){
    content = (
      <p>you refreshed the page, the data is gone</p>
    )
  }else{
    content = (
    <div className='profile-page'>
      <div className='profile-header'>
        <Link className='back-btn' to='/users'>Go Back</Link>
        <Theme/>
      </div>
      <div className='profile-page-content'>
         <div className='profile-page-upper'>
          <div className='profile-page-upper-left'>
          {profileImage ?   <img className='profile-image' width={180} height={180} src={profileImage}/> : <img  className='profile-image' width={180} height={180} src={defaultImage}/>}
          <p className='profile-username'> {user.username}</p>
          </div>
          <div className='profile-page-upper-right'>
          <p className='profile-description'> {user.description}</p>
          </div>
         </div>
         <div className='profile-page-lower'>
         {recipes}
         </div>
      </div>
 
      </div>
    )
  }
  return content
}

export default Profile
