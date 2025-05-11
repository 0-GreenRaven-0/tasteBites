import {useState, useEffect, useRef} from 'react'
import { useEditUserImageMutation, useDeleteUserImgMutation } from '../userImgApiSlice'
import { useNavigate } from 'react-router-dom'
import './EditProfilePic.css'

const ProfilePicManagement = ({userImage, user, imgAfterCrop}) => {

  const navigate = useNavigate()

  const [editUserImage, {
    isSuccess: isEditSuccess,
    isLoading: isEditLoading,
    isError: isEditError,
    error: editError
  }] = useEditUserImageMutation()

  const [deleteUserImage, {
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    error: deleteError
  }] = useDeleteUserImgMutation()

 const handleImageEdit = async (e) => {
  e.preventDefault()
  if(imgAfterCrop){
    const formData = new FormData()
    formData.append("user", user)
    formData.append("oldPic", userImage.id)
    const blob = await (await fetch(imgAfterCrop)).blob()
    const file = new File([blob], "profile-pic.jpg", { type: "image/jpeg" })
    formData.append("newPic", file)
    
    try{
     await editUserImage(formData)
    }catch(err){
      console.log(err)
    }
  }
 }

 const handleImageDelete = async (e) => {
  e.preventDefault()
  try{
   await deleteUserImage({id: userImage.id}).unwrap()
  }catch(err){
    console.log(err)
  }
 }

 useEffect(() => {
  if(isEditSuccess){
    alert("image successfully edited!")
    navigate('/')
  }else if(isEditError){
    alert(editError)
  }

  if(isDeleteSuccess){
    navigate('/')
    alert("the image was successfully removed, back to the default one")
  }else if(isDeleteError){
    alert(deleteError?.data?.message)
  }

 },[isEditSuccess,isDeleteSuccess, isEditError, isDeleteError, editError, deleteError])

  return (
    <div className='my-profile-pic-edit'>
      <button className='btn' onClick={handleImageEdit}>Save</button>
      <button className='btn' onClick={handleImageDelete}>Delete the image</button>
    </div>
  )
}

export default ProfilePicManagement
