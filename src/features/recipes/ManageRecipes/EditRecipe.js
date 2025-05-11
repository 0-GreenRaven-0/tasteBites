import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetRecipesQuery } from '../recipeApiSlice'
import { useGetRecipeImagesQuery } from '../../recipeImages/recipeImageApiSlice'
import EditRecipeForm from './EditRecipeForm/EditRecipeForm'

const EditRecipe = () => {

    const {id} = useParams()

    const {recipe} = useGetRecipesQuery('recipesList', {
        selectFromResult: ({data}) => ({
            recipe: data?.entities[id]
        })
    }) 

    const { images } = useGetRecipeImagesQuery('recipeImageList', {
        selectFromResult: ({ data }) => ({
            images: data ? Object.values(data.entities).filter(image => image.recipe === id) : []
        })
    });

    if(!recipe){
        return (
            <p>
                This recipe does not exist or could not be fetched
            </p>
        )
    }else{
        return <EditRecipeForm recipe={recipe} oldImages={images}/>
    }

}

export default EditRecipe
