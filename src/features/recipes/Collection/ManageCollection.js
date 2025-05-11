import { useAddToCollectionMutation, useRemoveFromCollectionMutation } from '../recipeApiSlice'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../users/usersApiSlice'
import { FaHeart } from 'react-icons/fa'
import '../Collection/Collection.css'

const ManageCollection = ({ userId, recipeId }) => {
  const user = useSelector((state) => selectUserById(state, userId))
  const isFavorite = user?.favorites?.includes(recipeId)

  const [addToCollection] = useAddToCollectionMutation()
  const [removeFromCollection] = useRemoveFromCollectionMutation()

  const handleCollection = async () => {
    try {
      if (isFavorite) {
        await removeFromCollection({ userId, recipeId }).unwrap()
      } else {
        await addToCollection({ userId, recipeId }).unwrap()
      }
    } catch (err) {
      console.log('Collection error:', err)
    }
  }

  return (
    <FaHeart
      className={`collection-button ${isFavorite ? 'favorite' : 'not-favorite'}`}
      onClick={handleCollection}
    />
  )
}

export default ManageCollection
