import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { recipeApiSlice } from '../recipes/recipeApiSlice'
import { userImgApiSlice } from '../profileImage/userImgApiSlice'
import { recipeImageApiSlice } from '../recipeImages/recipeImageApiSlice'
import { reviewApiSlice } from '../reviews/reviewApiSlice'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))
        store.dispatch(recipeApiSlice.util.prefetch('getRecipes', 'recipesList' , {force: true}))
        store.dispatch(userImgApiSlice.util.prefetch('getUserImage', 'profilePicsList' , {force: true}))
        store.dispatch(reviewApiSlice.util.prefetch('getReviews', 'reviewsList', {force: true}))
        store.dispatch(recipeImageApiSlice.util.prefetch('getRecipeImages', 'recipeImageList', {force: true}))
    }, [])

    return <Outlet/>
}

export default Prefetch
