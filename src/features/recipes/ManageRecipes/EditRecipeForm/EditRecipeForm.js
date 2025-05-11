import {useEffect, useState} from 'react'
import { useDeleteRecipeMutation, useEditRecipeMutation } from '../../recipeApiSlice'
import { useUploadRecipeImageMutation } from '../../../recipeImages/recipeImageApiSlice'
import RecipeForm from '../RecipeForm/RecipeForm'
import MessageBox from '../../../../components/Utility/MessageBox/MessageBox'
import { useNavigate } from 'react-router-dom'
import Theme from '../../../../components/Utility/Theme/Theme'
import './EditRecipeForm.css'


const EditRecipeForm = ({recipe, oldImages}) => {

  const navigate = useNavigate()

  const [name, setName] = useState(recipe.name)
  const [description, setDescription] = useState(recipe.description)
  const [cuisine, setCuisine] = useState(recipe.cuisine)
  const [difficulty, setDifficulty] = useState(recipe.difficulty)
  const [images, setImages] = useState([])
  const [totalImages, setTotalImages] = useState(oldImages.length)
  const [touched, setTouched] = useState(false)
  const [tags, setTags] = useState(recipe.tags || [])
  const [buttonState, setButtonState] = useState('Remove')
  const [show, setShow] = useState(false)

    const [deleteRecipe, {
        isSuccess: isDeleteRecipeSuccess,
        isError: isDeleteRecipeError,
        error: deleteRecipeError
    }] = useDeleteRecipeMutation()

    const [editRecipe, {
      isSuccess: isEditSuccess,
      isLoading: isEditLoading,
      isError: isEditError,
      error: editError
    }] = useEditRecipeMutation()

    const [uploadRecipeImage, {
      isSuccess: isUpImageSuccess,
      isLoading: isUpImageLoading,
      isError: isUpImageError,
      error: upImageError
    }] = useUploadRecipeImageMutation()

    const handleDelete = async() => {
  
       try{
          await deleteRecipe(recipe.id)
       }catch(err){
           console.error(err)
       }
    }

    const uploadImages = async (recipeId) => {

        try{
          const formData = new FormData()
          formData.append('recipe', recipeId)

          for (const image of images) {
            const blob = await (await fetch(image)).blob();
            const file = new File([blob], `recipe-img-${images.indexOf(image)}.jpg`, {type: "image/jpeg"})
            formData.append('images', file); 
          }

        await uploadRecipeImage(formData).unwrap()
        setImages([])
      }catch(err){
        console.log(upImageError)
      }
     
    }
    
    const handleEdit = async (e) => {
      e.preventDefault();
 
      if(touched === true){
        try{
          await editRecipe({
            id: recipe.id,
            name,
            description,
            cuisine,
            difficulty,
            tags,
          }).unwrap();

          if(images.length > 0){
            uploadImages(recipe.id)
          }
        }catch(err){
          console.log(err)
        }
      }else{
        alert('you did not make any changes')
        navigate('/')
      } 
    };


   useEffect(() => {
    if(isEditSuccess || isUpImageSuccess){
      alert("editing was success!")
      setTouched(false)
    }
   },[isEditSuccess, isUpImageSuccess])

    useEffect(() => {
      if(isDeleteRecipeError){
        alert(deleteRecipeError?.data?.message)
      }
    },[isDeleteRecipeError, deleteRecipe])

    useEffect(() => {
      if(isUpImageLoading){
       setButtonState('Uploading...')
       alert('loading...')
      }else{
        setButtonState('Remove')
      }
    },[isUpImageLoading])
    
  return (
    <div className='recipe-form-edit'>
      <div className='recipe-form-edit-header'>
        <button className='back-btn' onClick={() => {
          navigate('/myRecipes')
        }}>Go Back</button>

      <div className='right'>
      <Theme/>
      <button
      className='delete-recipe-btn'
      onClick={() => {
        setShow(true)
      }}>
        Delete Recipe
      </button>
      </div>
      </div>
      <MessageBox show={show} setShow={setShow} title={"Delete the Recipe?"} message={"Are you sure you want to delete the recipe?"} buttonsType={'yes-no'} callBackFunction={handleDelete} navigateMethod={() => {
        navigate('/myRecipes')
      }}/>
      <RecipeForm
      submitFunction={handleEdit}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      cuisine={cuisine}
      setCuisine={setCuisine}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      tags={tags}
      setTags={setTags}
      images={images}
      setImages={setImages}
      oldImages={oldImages}
      totalImages={totalImages}
      setTotalImages={setTotalImages}
      setTouched={setTouched}
      actionName={'Edit'}
      purpose={'edit'}
      buttonState={buttonState}
      />  
    </div>
  )
}

export default EditRecipeForm
