import { useState, useEffect } from "react";

const ImageSlider = () => {
  const images = [
    "/HeaderImages/pexels-293447046-13471477.jpg",
    "/HeaderImages/pexels-cmrcn-30380509.jpg",
    "/HeaderImages/pexels-illuseenator-4635600.jpg",
    "/HeaderImages/pexels-ionela-mat-268382825-19671314.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden", // Hide images that are outside the container
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: `${images.length * 100}%`, // Ensures all images fit
          transition: "transform 1s ease-in-out", // Smooth transition
          transform: `translateX(-${currentIndex * 100}%)`, // Slide the images
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              width: "100%", // Make each image take full width of the container
              height: "100%",
              flexShrink: 0, // Prevent image shrink
              backgroundImage: `url(${image})`, // Set background image
              backgroundSize: "cover", // Ensure it covers the container
              backgroundPosition: "center", // Center the image
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
