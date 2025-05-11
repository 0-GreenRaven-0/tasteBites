import {useState, useEffect} from 'react'
import {useUploadImageMutation} from '../userImgApiSlice'
import './UploadProfileImg.css'
import MessageBox from '../../../components/Utility/MessageBox/MessageBox'

const UploadProfileImg = ({user, imgAfterCrop}) => {

  const [show, setShow] = useState(false)

    const [uploadImage, {
        isSuccess,
        isLoading,
        isError,
        error
    }] = useUploadImageMutation()

    const handleUpload = async () => {
      if(!imgAfterCrop){
        setShow(true)
      }

      if (imgAfterCrop) {
          const formData = new FormData();
          formData.append("user", user); // Send user ID
          const blob = await (await fetch(imgAfterCrop)).blob()
          const file = new File([blob], "profile-pic.jpg", { type: "image/jpeg" })
          formData.append("image", file)
  
          try {
              await uploadImage(formData);
          } catch (err) {
              console.log("Image upload failed", err);
          }
      }
  };

  useEffect(() => {
  if(isError){
    console.log(error)
  }else if(isSuccess){
    alert("the image was successfully uploaded! :D")
  }
  },[isError,error, isSuccess])

  return (
    <div>
      <MessageBox show={show} setShow={setShow} title={"No image >:("} message={"You haven't provided an image yet you idiot..."} buttonsType={'confirm'}/>
      <h2 className='set-profile-pic'>set a profile picture</h2>

      <button className='btn' onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  )
}

export default UploadProfileImg
