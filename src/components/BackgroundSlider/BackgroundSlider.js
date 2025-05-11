import React from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './BackgroundSlider.css'

const BackgroundSlider = ({content}) => {
  const images = [
    {
      original: "./HeaderImages/pexels-293447046-13471477.jpg",
      thumbnail: "./HeaderImages/pexels-293447046-13471477.jpg",
      loading: "./elementor-placeholder-image.webp"
    },
    {
      original: "./HeaderImages/pexels-cmrcn-30380509.jpg",
      thumbnail: "./HeaderImages/pexels-cmrcn-30380509.jpg",
      loading: "./elementor-placeholder-image.webp"
    },
    {
      original: './HeaderImages/pexels-illuseenator-4635600.jpg',
      thumbnail: './HeaderImages/pexels-illuseenator-4635600.jpg',
      loading: "./elementor-placeholder-image.webp"
    },
    {
      original: "./HeaderImages/pexels-ionela-mat-268382825-19671314.jpg",
      thumbnail: "./HeaderImages/pexels-ionela-mat-268382825-19671314.jpg",
      loading: "./elementor-placeholder-image.webp"
    }
  ];

  return (
    <div className="background-slider-header">
      <Gallery 
        items={images}
        showNav={false} // Hides the navigation buttons (prev/next)
        showThumbnails={false} // Hides the thumbnails
        showPlayButton={false} // Hides the play/pause button
        showFullscreenButton={false} // Hides the fullscreen button
        showBullets={false} // Hides the indicator bullets
        autoPlay={true} // Enables autoplay
        slideInterval={4000}
        renderItem={(item) => {
          // Custom render for each slide, add placeholder here
          return (
            <div className="image-gallery-slide" style={{position: 'relative'}}>
              <img 
                src={item.loading} 
                alt="loading" 
                style={{
                  width: '100%', 
                  height: '50vh', 
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} 
              />
              <img
                src={item.original}
                alt="gallery"
                style={{
                  width: '100%',
                  height: '50vh',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0
                }}
                onLoad={(e) => {
                  e.target.style.opacity = 1; // Fade in the real image
                }}
              />
            </div>
          );
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0%",
          width: "100%"
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default BackgroundSlider;
