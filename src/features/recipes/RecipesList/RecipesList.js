import {useState} from 'react'
import { useGetRecipesQuery } from "../recipeApiSlice"
import { selectUserById } from '../../users/usersApiSlice'
import SearchBar from "../../../components/Utility/SearchBar/SearchBar"
import Recipe from "../Recipe/Recipe"
import CuisineFilter from "../../../components/Utility/CuisineFilter"
import DifficultyFilter from "../../../components/Utility/DifficultyFilter"
import TagsFilter from "../../../components/Utility/TagsFilter"
import { CircleLoader } from 'react-spinners'
import useAuth from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {motion} from 'framer-motion'
import './RecipesList.css'

const RecipesList = ({errorElement, filterCollection}) => {

  const {id:userId} = useAuth()

  const user = useSelector(state => selectUserById(state, userId))
    
      const [search, setSearch] = useState('')
      const [cuisine, setCuisine] = useState('')
      const [difficulty, setDifficulty] = useState('')
      const [tags, setTags] = useState([])
    
    let content

    const {
        data: recipes,
        isSuccess,
        isLoading,
        isError,
        error
        } = useGetRecipesQuery('recipesList', {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })

        
            if(isLoading){
                content = <CircleLoader/>
            }
        
            if(isError){
                content = <div>
                    <p>Something went wrong....</p>
                    <br/>
                    <p>{error?.data?.message}</p>
                </div>
            }

      if (isSuccess) {
          
            if (recipes) {

              if(filterCollection){
                const collectionFilteredRecipes = Object.values(recipes.entities)
                .filter((recipe) => {
                  return user.favorites.includes(recipe.id)
                })

                if(collectionFilteredRecipes.length > 0){
                  const filteredRecipes = collectionFilteredRecipes
              .filter((recipe) => {
                return search.toLowerCase() === '' 
                  ? recipe 
                  : recipe.name.toLowerCase().includes(search.toLowerCase());
              })
              .filter((recipe) => {
                return cuisine.toLowerCase() === ''
                ? recipe
                : recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
              })
              .filter((recipe) => {
                return difficulty.toLowerCase() === ''
                ? recipe 
                : recipe.difficulty.toLowerCase().includes(difficulty.toLowerCase())
              })
              .filter((recipe) => {
                return tags.length === 0
                ? recipe
                : tags.some(tag => recipe.tags.includes(tag))
              })

              content = (
                <div id='recipes'>
                <div className='search-tools'>
                <SearchBar search={search} setSearch={setSearch} />
                <CuisineFilter cuisine={cuisine} setCuisine={setCuisine}/>
                <DifficultyFilter difficulty={difficulty} setDifficulty={setDifficulty}/>
                <TagsFilter tags={tags} setTags={setTags}/>
                </div>
                  <br/>
                  <div className='recipe-list'>
                  {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                      <Recipe key={recipe._id} recipeId={recipe._id} />
                    ))
                  ) : (
                    <h3 className='no-content'>No recipes found with current filters.</h3>
                  )}
                  </div>
                 </div>
              );
                }else{
                  content = (
                    <div className='collection-page-empty'>
                    You haven't added anything to your collection, click the "❤️" icon above the recipe to add them to your collection and they will appear here
                    </div>
                  )
                }
              }else{
                const filteredRecipes = Object.values(recipes.entities)
                .filter((recipe) => {
                  return search.toLowerCase() === '' 
                    ? recipe 
                    : recipe.name.toLowerCase().includes(search.toLowerCase());
                })
                .filter((recipe) => {
                  return cuisine.toLowerCase() === ''
                  ? recipe
                  : recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
                })
                .filter((recipe) => {
                  return difficulty.toLowerCase() === ''
                  ? recipe 
                  : recipe.difficulty.toLowerCase().includes(difficulty.toLowerCase())
                })
                .filter((recipe) => {
                  return tags.length === 0
                  ? recipe
                  : tags.some(tag => recipe.tags.includes(tag))
                })
  
                const collectionFilteredRecipes = filteredRecipes.filter((recipe) => {
                  return !filterCollection || user.favorites.includes(recipe.id)
                })
                content = (
                  <div id='recipes'>
                  <div className='search-tools'>
                  <SearchBar search={search} setSearch={setSearch} />
                  <CuisineFilter cuisine={cuisine} setCuisine={setCuisine}/>
                  <DifficultyFilter difficulty={difficulty} setDifficulty={setDifficulty}/>
                  <TagsFilter tags={tags} setTags={setTags}/>
                  </div>
                    <br/>
                    <div className='recipe-list'>
                    {filteredRecipes.length > 0 ? (
                      filteredRecipes.map((recipe) => (
                        <Recipe key={recipe._id} recipeId={recipe._id} />
                      ))
                    ) : (
                      <h3 className='no-content'>No recipes found with current filters.</h3>
                    )}
                    </div>
                   </div>
                );
                
              }
    
            } else {
              content = errorElement;
            }
          }

  return content
}

export default RecipesList
