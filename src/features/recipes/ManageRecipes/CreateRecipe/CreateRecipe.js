import { useState, useEffect } from 'react';
import { useAddNewRecipeMutation } from '../../recipeApiSlice';
import { useUploadRecipeImageMutation } from '../../../recipeImages/recipeImageApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import RecipeForm from '../RecipeForm/RecipeForm';
import MessageBox from '../../../../components/Utility/MessageBox/MessageBox';
import Theme from '../../../../components/Utility/Theme/Theme'

const CreateRecipe = () => {
    const { id: user } = useAuth();
    const navigate = useNavigate();

    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [buttonState, setButtonState] = useState('Remove')

    // Use states for the message box
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [callBackFunction, setCallBackFunction] = useState()

    const [addNewRecipe, { 
        isSuccess: isCreateSuccess, 
        isError: isCreateError }] 
        = useAddNewRecipeMutation();
   
    const [uploadRecipeImage, {
        isSuccess: isUpImageSuccess
    }] = useUploadRecipeImageMutation();

    const uploadImages = async (recipeId) => {

        try{
          const formData = new FormData()
          formData.append('recipe', recipeId)

          for (const image of images) {
            const blob = await (await fetch(image)).blob();
            const file = new File([blob], `recipe-img-${images.indexOf(image)}.jpg`, {type: "image/jpeg"})
            formData.append('images', file); 
            console.log(file)
          }

        await uploadRecipeImage(formData).unwrap()
        setImages([])
      }catch(err){
        console.log(err)
      }
     
    }

    const createNewRecipe = async (e) => {
        e.preventDefault();
 
        if(!name){
            setTitle("All Fields are required!")
            setMessage("Please provide a name for the recipe.")
            setShow(true)
            return
         }else if(tags.length === 0){
             setTitle("All Fields are required!")
             setMessage("Recipe must have at least one tag")
             setShow(true)
             return
         }else if(!cuisine){
             setTitle("All Fields are required!")
             setMessage("Please specify the recipe's cuisine")
             setShow(true)
             return
         }else if(!difficulty){
             setTitle("All Fields are required!")
             setMessage("Please set the recipe's difficulty")
             setShow(true)
             return
         }else{
            try {
                const response = await addNewRecipe({
                    user,
                    name,
                    description,
                    cuisine,
                    difficulty,
                    tags
                }).unwrap();
    
                if (response) {
                    await uploadImages(response._id);
                }
            } catch (err) {
                console.error(err);
            }
         }
    };

    useEffect(() => {
        if (isCreateSuccess & isUpImageSuccess) {
            setTitle("Success! :D")
            setMessage("Your recipe was created! the images will be uploaded in a few moments")
            setShow(true)
            setCallBackFunction(() => () => {
                navigate('/myRecipes');
              });
              
        }else if(isCreateSuccess){
            setTitle("Success! :D")
            setMessage("Your recipe was created!")
            setShow(true)
            setCallBackFunction(() => () => {
                navigate('/myRecipes');
              });
              
        }else if(isCreateError){
            setTitle("Something went wrong...")
            setMessage("Your recipe could not be created, please try again later")
            setShow(true)
        }
    }, [ isCreateSuccess, isUpImageSuccess, isCreateError]);


    return (
        <>
             <div className='user-recipe-list-page-header'>
              <button className='back-btn' 
              onClick={() => {
                navigate('/myRecipes')
              }}
              >Go Back</button>

              <Theme/>
            </div>
            <MessageBox show={show} setShow={setShow} title={title} message={message} buttonsType={'confirm'} callBackFunction={callBackFunction}/>
            <RecipeForm
                submitFunction={createNewRecipe}
                name={name} setName={setName}
                description={description} setDescription={setDescription}
                cuisine={cuisine} setCuisine={setCuisine}
                difficulty={difficulty} setDifficulty={setDifficulty}
                images={images} setImages={setImages}
                tags={tags} setTags={setTags}
                actionName={'Create'}
                buttonState={buttonState}
                purpose={'creation'}
            />
        </>
    );
};

export default CreateRecipe;
