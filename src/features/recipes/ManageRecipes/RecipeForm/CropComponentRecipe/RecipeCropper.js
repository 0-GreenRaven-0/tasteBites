import { useState, useEffect } from 'react'
import FileInput from '../../../../profileImage/CropComponent/FileInput/FileInput'
import ImageCropper from '../../../../profileImage/CropComponent/ImageCropper/ImageCropper'
import './RecipeCropper.css'


const RecipeCropper = ({images, setImages, setTouched, totalImages, buttonState}) => {

  const [currentPage, setCurrentPage] = useState("choose-img")
  const [img, setImg] = useState('')

  const onImageSelected = (selectedImg) => {
    setImg(selectedImg)
    if(setTouched){
      setTouched(true)
    }
    setCurrentPage("crop-img")
  }
  

  // call back function when the cropping is done
  const onCropDone = (imgCroppedArea) => {
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

      const dataUrl = canvasEle.toDataURL("image.jpeg")

      setImages([...images, dataUrl])
      setCurrentPage('img-cropped')
    }
  }

  const onCropCancel = () => {
    setCurrentPage("choose-img")
    setImg("")
  }

  useEffect(() => {
    if(!images.length){
      setCurrentPage("choose-img")
    }
  },[images])

  return (
    <div className='image-cropper-panel'>

      {currentPage === "choose-img" ? (
        <FileInput onImageSelected={onImageSelected} totalImages={totalImages} component={"recipe-form"} />
      ) : currentPage === "crop-img" ? (
        <ImageCropper 
        component={"recipe-form"}
        img={img}
        onCropDone={onCropDone}
        onCropCancel={onCropCancel}
        ratio={(3/2)}
        />
      ) : (
        <div className='cropped-images-container'>
          {currentPage === "img-cropped" && images.length < 5 && (
            <FileInput onImageSelected={onImageSelected} component={"recipe-form"} />
          )}

          {images.map((img, index) => (
            <div key={index} className='cropped-img-container'>
              <img src={img} className='cropped-recipe-img' />
              <button
                type="button"
                className='remove-cropped-img'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setImages((prev) => prev.filter(image => image !== img));
                }}
              >
                {buttonState}
              </button>
            </div>
          ))}
        </div>

      )}
    </div>
  )
}

export default RecipeCropper
