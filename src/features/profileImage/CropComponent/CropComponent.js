import {useState} from 'react'
import './CropComponent.css'
import FileInput from './FileInput/FileInput'
import ImageCropper from './ImageCropper/ImageCropper'
import EditProfilePic from '../EditProfilePic/EditProfilePic'
import UploadProfileImg from '../UploadProfileImg/UploadProfileImg'

const CropComponent = ({userImage, user, purpose, component}) => {

   let ratio = component === 'edit-user' ? 1/1 : 4/3

    const [currentPage, setCurrentPage] = useState("choose-img")
    const [imgAfterCrop, setImgAfterCrop] = useState("")
    const [img, setImg] = useState("")

    // call back function when image is selected
    const onImageSelected = (selectedImg) => {
    setImg(selectedImg)
    setCurrentPage("crop-img")
    }

     // call back function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    //create a canvas element to crop the image
    const canvasEle = document.createElement("canvas")
    canvasEle.width = imgCroppedArea.width
    canvasEle.height = imgCroppedArea.height
    
    const context = canvasEle.getContext("2d")

    // Load the selected image
    let imageObj1 = new Image()
    imageObj1.src = img
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      )

      // Convert the canvas content to a data URL (JPEG Format)
      const dataUrl = canvasEle.toDataURL("image/jpeg")

      setImgAfterCrop(dataUrl)
      setCurrentPage("img-cropped")
    }
  }

  // call back function when cropping is cancelled
  const onCropCancel = () => {
    setCurrentPage("choose-img")
    setImg("")
  }


  return (
    <div  className={`image-cropper-panel ${component === 'edit-user' ? 'for-profile-img' : ''}`}>
      {currentPage === "choose-img" ? (
        <FileInput onImageSelected={onImageSelected}/>
      ) : currentPage === "crop-img" ? (
        <ImageCropper 
        img={img}
        onCropDone={onCropDone}
        onCropCancel={onCropCancel}
        ratio={ratio}
        />
      ) : (
        <div>
          <div>
            <img src={imgAfterCrop} className='cropped-img'/>
          </div>
  
        </div>
      )}
      <div className='image-cropper-panel-buttons'>
       {purpose === 'edit' ? (  
        <EditProfilePic userImage={userImage} user={user} imgAfterCrop={imgAfterCrop}/>) 
        :(
        <UploadProfileImg user={user} imgAfterCrop={imgAfterCrop}/>
        )}
      {currentPage === "img-cropped" && (
        <>
          <button
          onClick={() => {
            // Allow cropping the current image again
            setCurrentPage("crop-img")
          }}
          className='btn'
          >
          Crop
          </button>

          <button
          onClick={() => {
           setCurrentPage("choose-img")
           setImg("")
          }}
             className='btn'
          >
          New Image
          </button></>
      )}
      </div>
     
    </div>
  )
}

export default CropComponent
