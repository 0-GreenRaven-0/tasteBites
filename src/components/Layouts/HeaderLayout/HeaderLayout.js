import {useState, useRef, useEffect} from 'react'
import logo from './tasteBites.png'
import { Link } from 'react-router-dom'
import './HeaderLayout.css'
import useAuth from '../../../hooks/useAuth'
import img from '../../Settings/default-avatar.png'
import {useGetUserImageQuery} from '../../../features/profileImage/userImgApiSlice'
import BackgroundSlider from '../../BackgroundSlider/BackgroundSlider'
import DropdownMenu from '../../DropdownMenu/DropdownMenu'
import Theme from '../../Utility/Theme/Theme'
import {FaBars} from 'react-icons/fa'

const HeaderLayout = () => {

  const {username, id: user/* , darkMode */} = useAuth()
  const [dropMenu, setDropMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setDropMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  let imageUrl = img

  const {
    data: profileImages,
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetUserImageQuery('profilePicsList', {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  })
  

  if (isSuccess) {
    const { ids, entities } = profileImages;
  
    if (ids?.length) {
      const userImage = ids.map(id => entities[id]).find(image => image.user === user);
  
      if (userImage) {
        imageUrl = userImage.url || img; // Use the found image URL or fallback
      } 
    } 
  }
  
  let content

  if (username) {
    content = (
   
      <div className='header-container'>

        <div className='header-top'>

         <div className='left'>
         <img src={imageUrl} width={50} height={50} />
         <p>{username}</p>
         </div>

         <div className='right'>

       <Theme/>
      <div ref={menuRef} >
        <FaBars className='dropMenu-icon' onClick={() => setDropMenu(prev => !prev)} />
        {dropMenu && <DropdownMenu userId={user}/>}
      </div>
         </div>
        </div>

        <div className='bottom'>
          <img src={logo} width={300} height={300} className='logo-img'/>
        </div>

      </div>
    )
  } else {
    content = (
   
      <div className='header-container'>

        <div className='header-top'>

         <div className='left'>
         <Link className='header-button' to={'/login'}>Login</Link>
         <p className='header-username'>{username}</p>
         </div>

         <div className='right'>
       <Theme className="control-icons"/>
      <div ref={menuRef} >
        <FaBars className='dropMenu-icon control-icons' onClick={() => setDropMenu(prev => !prev)} />
        {dropMenu && <DropdownMenu userId={user}/>}
      </div>
         </div>
        </div>

        <div className='bottom'>
          <img src={logo} width={300} height={300} className='logo-img'/>
        </div>

      </div>
    )
  }

  return <BackgroundSlider content={content}/>
  
}

export default HeaderLayout
