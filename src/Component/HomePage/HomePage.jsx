import * as React from "react";
import { useState, useEffect } from "react";
import sampleImage1 from "../../assets/backgrounddas.png"; // Ensure the path to the images is correct
import sampleImage2 from "../../assets/backgrounddas1.png";
import sampleImage3 from "../../assets/backgrounddas2.png";

const images = [sampleImage1, sampleImage2, sampleImage3];

function MyComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-3/5 h-[500px] mt-10 mx-auto">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slideshow image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
