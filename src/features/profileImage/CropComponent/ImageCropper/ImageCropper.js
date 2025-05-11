import React,{useState} from 'react'
import Cropper from 'react-easy-crop'
import './ImageCropper.css'

const ImageCropper = ({img, onCropDone, onCropCancel, component, ratio}) => {

    const [crop, setCrop] = useState({ x: 0, y: 0})
    const [zoom, setZoom] = useState(1)

    const [croppedArea, setCroppedArea] = useState(null)
    const [aspectRatio, setAspectRatio] = useState(ratio)

    const onCropComplete = (croppedAreaPercantage, croppedAreaPixels) => {
     // Store the cropped area in pixels
     setCroppedArea(croppedAreaPixels)
    }

    const onAspectRatioChange = (e) => {
        setAspectRatio(e.target.value)
    }
  return (
    <div className={`cropper-container ${component === 'recipe-form' ? 'recipe-img-cropper' : ''}`}>
     <div  className="cropper">
        <Cropper
        zoomSpeed={0.2}
        minZoom={1}
        maxZoom={3}
        image={img}
        aspect={ratio}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        style={{
         containerStyle: {
            position: "relative",
             width: "100%",
             height: "100%",
             backgroundColor: "black"
         }
     }}
        />
     </div>
     <div className='action-btns'>
{/*         <div className='aspect-ratios' onChange={onAspectRatioChange}>
           <input type='radio' value={1/1} name='ratio'/> 1:1
           <input type='radio' value={5/4} name='ratio'/> 5:4
           <input type='radio' value={4/3} name='ratio'/> 4:3
           <input type='radio' value={3/2} name='ratio'/> 3:2
           <input type='radio' value={5/3} name='ratio'/> 5:3
           <input type='radio' value={16/9} name='ratio'/> 16:9
           <input type='radio' value={3/1} name='ratio'/> 3:1
        </div> */}

        <div className='btn-container'>
             <button className='btn' 
             onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onCropCancel()
             }}>Cancel</button>
              &nbsp;
             <button
             className='btn'
             onClick={(e) => {
               e.preventDefault()
               e.stopPropagation()
                onCropDone(croppedArea)
             }}
             >
              Crop
             </button>
        </div>
     </div>
    </div>
  )
}

export default ImageCropper
