import {useState, useEffect} from 'react'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useUpdateUserMutation, selectUserById} from '../../../features/users/usersApiSlice'
import { useSelector } from 'react-redux'
import useAuth from '../../../hooks/useAuth'
import './Theme.css'

const Theme = () => {

  const {id} = useAuth()

  const user = useSelector(state => selectUserById(state, id))
  const darkMode = user?.darkMode

  const [dark, setDark] = useState(() => {
    return user?.darkMode ?? sessionStorage.getItem('darkMode') === 'true'
  })

  const [updateUser, {
    isSuccess,
    isLoading
  }] = useUpdateUserMutation()

  const toggleDarkMode = async () => {
    if(id){
      try{
        if(darkMode){
         await updateUser({id, darkMode: false}).unwrap()
        }else{
         await updateUser({id, darkMode: true}).unwrap()
        }
       }catch(err){
         console.error(err)
       }
    }else{
      toggleDarkmodeLocally()
    }
   
  }

  const toggleDarkmodeLocally = () => {

    setDark(prev => {
      const newValue = !prev;
      sessionStorage.setItem("darkMode", newValue);
      return newValue;
    });
  };

  const style = {
    color: `${dark ? 'orange' : '#4f9aff'}`,
    cursor: 'pointer'
  }



  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
  }, [dark]);

  useEffect(() => {
    if(isSuccess){
      setDark(darkMode)
    }
  },[isSuccess, darkMode])


  return (
    dark? (
        <button disabled={isLoading} style={{
          background: 'none',
          border: 'none'
        }}>
            <FaSun onClick={toggleDarkMode} className='theme-icon' style={style}/>
        </button>
    ) : (
      <button disabled={isLoading} style={{
        background: 'none',
        border: 'none'
      }}>
           <FaMoon onClick={toggleDarkMode} className='theme-icon' style={style}/>
      </button>

    )
  )
}


export default Theme
