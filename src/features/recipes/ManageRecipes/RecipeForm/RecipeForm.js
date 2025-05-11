import { useEffect } from "react";
import { useDeleteRecipeImageMutation } from "../../../recipeImages/recipeImageApiSlice";
import RecipeCropper from "./CropComponentRecipe/RecipeCropper";
import './RecipeForm.css';

const RecipeForm = ({
    submitFunction,
    name, setName,
    description, setDescription,
    cuisine, setCuisine,
    difficulty, setDifficulty,
    images, setImages,
    tags, setTags,
    oldImages = [],
    totalImages,
    setTotalImages = () => {},
    setTouched,
    buttonState,
    purpose
}) => {

    const MAX_TAGS = 5

    const toggleTag = (newTag) => {

        if(tags.length >= MAX_TAGS & !tags.includes(newTag)){
            alert('You may select up to 5 tags only')
        }else{
            setTags(prevTags =>
                prevTags.includes(newTag)
                    ? prevTags.filter(tag => tag !== newTag)
                    : [...prevTags, newTag]
            );
        }
    };

    const [deleteRecipeImage, {
        isSuccess: isImageDelSuccess,
        isError: isImageDelError,
        error: imageDelError
      }] = useDeleteRecipeImageMutation()

    const deleteImage = async(image) => {
        try{
          await deleteRecipeImage({recipe: image.recipe, oldPics: [image.id]})
        }catch(err){
          console.log(err)
        }
    }

  useEffect(() => {
    if(isImageDelSuccess){
        alert("the image has been deleted")
    }else if(isImageDelError){
        alert(isImageDelError)
    }

  },[isImageDelSuccess, isImageDelError, imageDelError])

/*   useEffect(() => {
    setTouched(true)
  },[name, description, cuisine, difficulty, tags]) */


  useEffect(() => {
    setTotalImages(oldImages.length + images.length);
  },[oldImages, images])


    return (
        <div className="recipe-form">
            <form onSubmit={submitFunction}>

            <div className="recipe-form-top">
                    
                    <RecipeCropper images={images} setImages={setImages} buttonState={buttonState} setTouched={setTouched} totalImages={totalImages}/>
                    <br/>
                    {purpose === 'edit' ? (       <div className="old-images-layout"> 
                    {oldImages.length ?  
                    <div className="old-images-container">
                        {oldImages.map((image, index) => (
                            <div key={index} className="old-recipe-img-container">
                            <img src={image.url} width={250} height={160} className="old-recipe-img"/>
                        <button className="delete-old-img-btn" type="button" onClick={() => deleteImage(image)}>Delete</button>
                            </div>
                            
                        ))}
                    </div> :   
                    <div className="empty-old-images-container">
                       <h2>You haven't set any images for this recipe yet</h2>
                    </div> } 
                    </div> ) : ' '}  

                    </div>

                    <br/>
                <div className="recipe-from-middle">

  
                <input className='recipe-input' type="text" placeholder="Name of the recipe" value={name}onChange={e => {
                        (setTouched && setTouched(true))
                        setName(e.target.value)}}/>
        
                 
                <div>

                    <select className='recipe-input' value={cuisine} onChange={e => {
                         (setTouched && setTouched(true))
                        setCuisine(e.target.value)}}>
                    <option value="">Select Cuisine</option>
                    <option value="italian">Italian</option>
                    <option value="french">French</option>
                    <option value="mexican">Mexican</option>
                    <option value="indian">Indian</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                    <option value="thai">Thai</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="american">American</option>
                    <option value="spanish">Spanish</option>
                    <option value="greek">Greek</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="korean">Korean</option>
                    <option value="turkish">Turkish</option>
                    <option value="moroccan">Moroccan</option>
                    <option value="caribbean">Caribbean</option>
                    <option value="german">German</option>
                    <option value="brazilian">Brazilian</option>
                    <option value="ethiopian">Ethiopian</option>
                    <option value="lebanese">Lebanese</option>
             </select>
                </div>

                <div>
                    <select className='recipe-input options' value={difficulty} onChange={e => {
                         (setTouched && setTouched(true))
                        setDifficulty(e.target.value)
                        }}>
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="expert">Expert</option>
                        <option value="Master">Master</option>
                    </select>
                </div>
                </div>
                <div className="recipe-form-bottom">

                    <div className="the-tags">
                        {[
                        'Quick Snack', 'Soup', 'BBQ', 'Salad', 'Fancy', 'Fast Food', 'Dessert', 'Vegan', 'Vegetarian',
                        'Seafood', 'Breakfast', 'Gluten-Free', 'Pasta', 'Healthy', 'Comfort Food', 'Street Food', 'Low Carb', 'Grill', 'Baked',
                        'Spicy', 'Sweet', 'Holiday Special', 'One Pot', 'Air Fryer', 'Keto', 'Paleo', 'Family Meal', 'Party Food', 'Finger Food',
                        'Traditional', 'International', 'Fusion', 'Seasonal', 'Brunch', 'Gourmet', 'Hearty', 'Frozen Treats', 'Smoothies', 'Casserole'
                        ].map(tag => (
                            <label key={tag} className="entire-tag">
                                {tag}
                                &nbsp;
                                <input type="checkbox" name="tag" 
                                onChange={e => {
                                    (setTouched && setTouched(true))
                                    toggleTag(tag)}}
                                    checked={tags.includes(tag)} />
                            </label>
                        ))}
                    </div>
                    
                    <div className="description-section">
                <textarea
                    className="description-input-recipe"
                    placeholder="Describe your recipe"
                    value={description}
                    onChange={e => {
                        (setTouched && setTouched(true))
                        setDescription(e.target.value)}}
                    style={{
                        whiteSpace: 'pre-wrap',  // Ensures line breaks are respected
                        wordWrap: 'break-word',  // Ensures text breaks at the container’s edge (word wrap)
                        width: '100%',  // Ensure it takes the full width of the parent
                        resize: 'none', // Optional: disables resizing
                        height: '150px' // Optional: gives a set height for the textarea
                    }}
                    />
                        </div>
               
                </div>
                

                <br/>
                <button type="submit" className="save-recipe-btn">Save</button>
            </form>
        </div>
    );
};

export default RecipeForm;
