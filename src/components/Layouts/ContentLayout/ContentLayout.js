import Introduction from '../Introduction/Introduction'
import RecipesList from '../../../features/recipes/RecipesList/RecipesList'
import './ContentLayout.css'
import {motion} from 'framer-motion'

const ContentLayout = () => {

  const emptyPage = (
    <h3 className='no-content'>There are no recipes created on this platform yet...</h3>
  )

  return (
    <div className='content-section'>
      <motion.div
      initial={{ opacity: 0, x: '-100%' }}  
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}  
    >
    <Introduction/>
    </motion.div>
    <br/>
    <RecipesList errorElement={emptyPage}/>
  </div>

  ) 
}

export default ContentLayout
