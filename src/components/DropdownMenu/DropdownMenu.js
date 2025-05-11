import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './DropdownMenu.css'
import MessageBox from '../Utility/MessageBox/MessageBox'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

const DropdownMenu = ({userId}) => {

  const [show, setShow] = useState(false)

  const navigate = useNavigate()

      const [sendLogout, {
        isSuccess
      }] = useSendLogoutMutation()

  
      const handleLogout = async() => {
        try{
            await sendLogout()
        }catch(err){
          console.log(err)
        }
      }
  
      useEffect(() => {
        if(isSuccess){
          sessionStorage.clear('persistLogin')
          localStorage.clear('TasteBites-autoLogin')
          navigate('/')
        }
      }, [isSuccess])

  return (
    <div className='flex flex-col'>
      <MessageBox show={show} setShow={setShow} title={"Logout"} message={"are you sure you want to log out?"} callBackFunction={handleLogout} buttonsType={'yes-no'}/>
      <ul className='flex flex-col gap-4 dropDownProfile'>
      {userId ? (<li onClick={() => navigate(`/users/${userId}`)}>My Profile</li>) : <li  onClick={() => navigate('/signUp')}>Sign Up</li>}
        <li onClick={() => navigate('/myRecipes')}>My Recipes</li>
       {userId &&  <li onClick={() => navigate('/myRecipes/collection')}>Collections</li>}
        <li onClick={() => navigate('/users')}>Explore People</li>
        {userId && (<li onClick={() => {
          setShow(true)
        }}>Log out</li>)}
      </ul>
    </div>
  )
}

export default DropdownMenu
