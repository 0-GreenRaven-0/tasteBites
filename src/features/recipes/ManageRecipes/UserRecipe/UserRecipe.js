import React from 'react'
import { useGetRecipesQuery } from '../../recipeApiSlice'
import { useNavigate } from 'react-router-dom'
import './UserRecipe.css'

const UserRecipe = ({recipeId, recipeImage}) => {

  const navigate = useNavigate()

    const {recipe} = useGetRecipesQuery('recipesList', {
        selectFromResult: ({data}) => ({
            recipe: data?.entities[recipeId]
        })
    })


  return (
    <div className='user-recipe'
    style={{
      backgroundImage: `url(${recipeImage})`
    }}
    
    onClick={() => {
      navigate(`/myRecipes/${recipe.id}`)
    }}>

        <p className='recipe-name'>{recipe.name}</p>

        <div className='hidden-content-container'>
           <div className='hidden-content'>
             {recipe.description ? (
              <p className='hidden-description'>
                {recipe.description.slice(0,200)}...
              </p>
             ) : "User didn't describe the recipe yet..."}

           </div>
        </div>
    </div>
  )
}

export default UserRecipe
