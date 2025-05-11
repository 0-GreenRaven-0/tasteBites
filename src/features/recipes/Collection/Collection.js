import React from 'react'
import { Link } from 'react-router-dom'
import RecipesList from '../RecipesList/RecipesList'
import Theme from '../../../components/Utility/Theme/Theme'
import './Collection.css'

const Collection = () => {

  const emptyPage = (
  <div className='collection-page-empty'>
    You haven't added anything to your collection, click the "❤️" icon above the recipe to add them to your collection and they will appear here
    </div>
    )

  return (
    <div className='collection-page'>
     <div className='collection-page-top'>
       <div className='collection-page-header'>
         <Link to={'/'} className='back-btn'>Go Back</Link>
         <Theme/>
       </div>
     </div>
     
     <div className='collection-page-bottom'>
      <RecipesList errorElement={emptyPage} filterCollection={true}/>
     </div>
    </div>
  )
}

export default Collection
