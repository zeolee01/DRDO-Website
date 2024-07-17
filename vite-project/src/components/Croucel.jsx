import React, { useState, useEffect } from "react";
import img1 from "../assets/Croucel/croucel1.jpg";
import img2 from "../assets/Croucel/croucel2.jpg";
import img3 from "../assets/Croucel/croucel3.jpg";
import img4 from "../assets/Croucel/croucel4.jpg";

const Croucel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [img1, img2, img3,img4];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-96"> {/* Set a fixed height for the carousel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide h-full" // Ensure full height
        data-coreui-ride="true"
      >
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-coreui-target="#carouselExampleIndicators"
              data-coreui-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner h-full"> {/* Set full height for inner */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? "active" : ""} w-full h-full`} // Set full height for item
            >
              <img
                src={image}
                className="h-full w-full object-cover" // Ensure image covers the container
                alt={`Carousel slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-coreui-target="#carouselExampleIndicators"
          data-coreui-slide="prev"
          onClick={() =>
            setActiveIndex((prevIndex) =>
              prevIndex === 0 ? images.length - 1 : prevIndex - 1
            )
          }
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-coreui-target="#carouselExampleIndicators"
          data-coreui-slide="next"
          onClick={() =>
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
};

export default Croucel;