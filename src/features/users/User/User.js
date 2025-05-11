import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useGetUserImageQuery} from '../../profileImage/userImgApiSlice'
import defaultImage from '../../../components/Settings/default-avatar.png'
import './User.css'

const User = ({user}) => {

    const navigate = useNavigate()

    const { profileImg, isLoading, isSuccess } = useGetUserImageQuery('profilePicsList', {
      selectFromResult: ({ data }) => {

    
        // Find the profile image where user matches user.id
        const profile = Object.values(data?.entities || {}).find(img => img.user === user.id);
    
        return { profileImg: profile };
      }
    });
    


    if(user){

      const handleEdit = () => navigate(`/profile/${user.id}`)

      return (
        <div className='user-info-card'>

          <div className='user-info-card-left'>
            {profileImg ? <img className='profile-image' src={profileImg.url} width={150} height={150}/> : <img className='profile-image' src={defaultImage} width={150} height={150}/>}
          </div>

          <div className='user-info-card-right'>
            <h2 className='user-username'>{user.username}</h2>
            <p className='user-description'>
              {user.description.slice(0,90)}...</p>
            <button onClick={handleEdit} className='view-profile-btn'>View Profile</button>
          </div>

        </div>
      )
    }
}

export default User
