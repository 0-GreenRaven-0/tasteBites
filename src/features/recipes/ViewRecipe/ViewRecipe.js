import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import Gallery from 'react-image-gallery';

import { selectRecipeById } from '../recipeApiSlice';
import { selectAllRecipeImgs } from '../../recipeImages/recipeImageApiSlice';

import ReviewList from '../../reviews/ReviewList';
import AddReview from '../../reviews/AddReview/AddReview';
import ManageCollection from '../Collection/ManageCollection';
import Theme from '../../../components/Utility/Theme/Theme';
import useAuth from '../../../hooks/useAuth';

import defaultRecipeImg from './Default Recipe Img.png';
import './ViewRecipe.css';

const ViewRecipe = () => {
  const { id: userId } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState('instructions');

  const recipe = useSelector((state) => selectRecipeById(state, id));
  const recipeImages = useSelector(selectAllRecipeImgs);

  let items = [{
    original: defaultRecipeImg,
    thumbnail: defaultRecipeImg
  }];

  if (recipeImages.length) {
    const filteredImages = recipeImages.filter(image => image.recipe === id);
    if (filteredImages.length) {
      items = filteredImages.map(image => ({
        original: image.url,
        thumbnail: image.url
      }));
    }
  }

  if (!recipe) return null;

  const RecipeInfo = () => (
    <>
      <h1 className='recipe-name'>{recipe.name}</h1>
      <h3>
        <StarRatings
          rating={recipe.overAllRating}
          starRatedColor='yellow'
          starDimension='35px'
        />
      </h3>
      <h3 className='recipe-info'>Difficulty: {recipe.difficulty}</h3>
      <h3 className='recipe-info'>Cuisine: {recipe.cuisine}</h3>
      {recipe.tags.map(tag => (
        <span className='tag' key={tag}>#{tag} </span>
      ))}
    </>
  );

  const RecipeContent = () => (
    currentSection === 'instructions' ? (
      <p className='recipe-desc' style={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</p>
    ) : (
      <div className='review-section'>
        {userId && <AddReview recipeId={recipe._id} />}
        <ReviewList recipeId={recipe._id} />
      </div>
    )
  );

  return (
    <>
      {/* Mobile View */}
      <div className='recipe-page mobile'>
        <div className='recipe-header'>
          <button className='recipe-button' onClick={() => navigate('/')}>Go Back</button>
          <Theme />
        </div>

        <div className='recipe-middle'>
          <div className='view-recipe-img'>
            <Gallery
              items={items}
              showThumbnails={false}
              showPlayButton={false}
              showFullscreenButton={false}
            />
            {id && (
              <div className='view-recipe-collection'>
                <ManageCollection userId={userId} recipeId={id} />
              </div>
            )}
          </div>

          <div className='recipe-middle-info'>
            <RecipeInfo />
          </div>

          <div className='recipe-bottom'>
            <button className={`recipe-button ${currentSection === 'instructions' ? 'selected' : ''}`} onClick={() => setCurrentSection('instructions')}>Instructions</button>
            <button className={`recipe-button ${currentSection === 'reviews' ? 'selected' : ''}`} onClick={() => setCurrentSection('reviews')}>Reviews</button>
          </div>

          <div className='recipe-under-bottom'>
            <RecipeContent />
          </div>
        </div>
      </div>

      {/* Laptop View */}
      <div className='recipe-page laptop'>
        <div className='recipe-leftside'>
          <div className='recipe-left-top'>
            <div className='view-recipe-img'>
              <Gallery
                items={items}
                showThumbnails={false}
                showPlayButton={false}
                showFullscreenButton={false}
              />
              {id && (
                <div className='view-recipe-collection'>
                  <ManageCollection userId={userId} recipeId={id} />
                </div>
              )}
            </div>
          </div>

          <div className='recipe-left-bottom'>
            <RecipeInfo />
          </div>
        </div>

        <div className='recipe-rightside'>
          <div className='recipe-right-top'>
            <Theme />
            <button className='recipe-button' onClick={() => navigate('/')}>Back</button>
            <button className={`recipe-button ${currentSection === 'reviews' ? 'selected' : ''}`} onClick={() => setCurrentSection('reviews')}>Reviews</button>
            <button className={`recipe-button ${currentSection === 'instructions' ? 'selected' : ''}`} onClick={() => setCurrentSection('instructions')}>Instructions</button>
          </div>

          <div className='recipe-right-bottom'>
            <RecipeContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRecipe;
