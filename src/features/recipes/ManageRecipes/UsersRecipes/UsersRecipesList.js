import {SquareLoader} from 'react-spinners'
import useAuth from '../../../../hooks/useAuth'
import {useGetRecipesQuery} from '../../recipeApiSlice'
import UserRecipe from '../UserRecipe/UserRecipe'
import { useNavigate, Link } from 'react-router-dom'
import { useGetRecipeImagesQuery } from '../../../recipeImages/recipeImageApiSlice'
import defaultImg from './Default Recipe Img.png'
import Theme from '../../../../components/Utility/Theme/Theme'
import './UsersRecipesList.css'

const UsersRecipesList = () => {
   let content

   const navigate = useNavigate()
   const {id: userId} = useAuth()

   const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRecipesQuery('recipesList', {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  })

  const {
    data: images,
    isLoading: isImageLoading,
    isSuccess: isImageSuccess,
    isError: isImageError,
    error: imageError
  } = useGetRecipeImagesQuery('recipeImageList', {
    refetchOnMountOrArgChange: true
  })

  if(isLoading){
    content = <SquareLoader />
  }
  
  if(isError){
    content = (
      <div>
        <p>Could not fetch this user's recipes</p>
        <p>{error?.data?.message}</p>
      </div>
    )
  }

  if(!userId){
    content = (
      <div className='unregistered-page'>
        <div className='user-recipe-list-page-header'>
          <button className='back-btn' onClick={() => navigate('/')}>Go Back</button>
          <Theme/>
        </div>
        <div className='unregistered-page-content'>
          <h2><Link to='/signUp' className='text-link'>Sign Up</Link> for a new account or <Link to='/login' className='text-link'>log in</Link> to your existing one to start creating and sharing your own recipes</h2>
        </div>
      </div>
    )
  } else if(isSuccess && isImageSuccess){
    const {ids, entities} = recipes
    let filteredIds
  
    if(ids?.length){
      filteredIds = ids.filter(recipeId => entities[recipeId].user === userId)
      if(filteredIds?.length > 0){
        content = (
          <div className='user-recipe-list-page'>
            <div className='user-recipe-list-page-header'>
              <button className='back-btn' onClick={() => navigate('/')}>Go Back</button>
              <div>
              <div className='right'>      
              <Theme/> 
              <button className='recipe-creation-btn' onClick={() => navigate('/myRecipes/createRecipes')}>+ Create New Recipe</button>
              </div>
              </div>
            </div>
            <div className='user-recipe-list-content'>
              {filteredIds.map(recipeId => {
                const recipeImages = Object.values(images.entities).filter(image => image.recipe === recipeId);
                return (
                  <div key={recipeId}>
                    <UserRecipe recipeId={recipeId} recipeImage={recipeImages?.length ? recipeImages[0].url : defaultImg} />
                  </div>
                );
              })}
            </div>
          </div>
        ) 
      }else{
        // Show empty page if no recipes are found
        content = (
          <div className='myRecipe-page-empty'>
            <div className='user-recipe-list-page-header'>
              <button className='back-btn' onClick={() => navigate('/')}>Go Back</button>
              <div className='right'>      
              <Theme/> 
              <button className='recipe-creation-btn' onClick={() => navigate('/myRecipes/createRecipes')}>+ Create New Recipe</button>
              </div>
            </div>
            <div className='myRecipe-page-center'>
              <h2 className='myRecipe-empty-title'>
                You haven't created any recipe yet...
              </h2>
            </div>
          </div>
        )
      }
    } else {
      // Handle case where no recipes or empty list
      content = (
        <div className='myRecipe-page-empty'>
          <div className='user-recipe-list-page-header'>
            <button className='back-btn' onClick={() => navigate('/')}>Go Back</button>
            <div className='right'>      
              <Theme/> 
              <button className='recipe-creation-btn' onClick={() => navigate('/myRecipes/createRecipes')}>+ Create New Recipe</button>
              </div>
          </div>
          <div className='myRecipe-page-center'>
            <h2 className='myRecipe-empty-title'>
              You haven't created any recipe yet...
            </h2>
          </div>
        </div>
      )
    }
  }
  

  return content
}

export default UsersRecipesList
