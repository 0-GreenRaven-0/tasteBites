import React, { useRef } from 'react'
import {FaCamera} from 'react-icons/fa'
import './FileInput.css'

const FileInput = ({ onImageSelected, component, totalImages }) => {

    const inputRef = useRef()

    const handleOnChange = (e) => {
       if(e.target.files && e.target.files.length > 0){
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            onImageSelected(reader.result)
        }
       }
    }

    const onChooseImg = () => {
        inputRef.current.click()
    }

  return (
    <div className={`container ${component === 'recipe-form' ? 'recipe-img' : ' '}`}>
       <input
       onClick={(e) => {
        if(totalImages >= 5 ){
          e.preventDefault()
          alert("you can upload only 5 images per recipe")
          return
        }
       }}
       type='file'
       accept='image/*'
       ref={inputRef}
       onChange={handleOnChange}
       style={{display: 'none'}}
       />

       <button 
       className={`${component === 'recipe-form' ? 'crop-recipe' : 'crop-btn'}`}
       onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onChooseImg()
        }}>
         <FaCamera/>
          Choose Image
       </button>
    </div>
  )
}

export default FileInput
