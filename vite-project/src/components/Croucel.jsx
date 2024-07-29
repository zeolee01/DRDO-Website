import React, { useState, useEffect } from "react"
import axios from "axios"

const Croucel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [data, setData] = useState(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/")
        if (response.data.length === 0) {
          setIsEmpty(true)
        } else {
          setData(response.data)
          setImages(response.data.map((item) => item.image))
          setIsEmpty(false)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="w-full h-96 bg-slate-600">
      {" "}
      {/* Set a fixed height for the carousel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide h-full"
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
        {/* -------------- */}
        <div className="carousel-inner h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              } w-full h-full`}
            >
              <img
                src={`http://localhost:3002/images/` + image}
                className="h-full w-full object-cover"
                alt={`Carousel slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* buttons */}
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
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        {/* next button */}
        <button
          className="carousel-control-next"
          type="button"
          data-coreui-target="#carouselExampleIndicators"
          data-coreui-slide="next"
          onClick={() =>
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  )
}

export default Croucel
