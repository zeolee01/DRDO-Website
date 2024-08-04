import React, { useState, useEffect } from "react"
import axios from "axios"
import { RiDeleteBin5Line } from "react-icons/ri"

const Croucel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [data, setData] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [isHover, setHover] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/")
        if (response.data.length === 0) {
          setIsEmpty(true)
        } else {
          setData(response.data)
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
      if (!isHover && data.length > 0) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % data.length)
      }
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [isHover, data])

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  const handleImgDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/deleteimg/${id}`)
      const updatedData = data.filter((item) => item.id !== id)
      setData(updatedData)
      setActiveIndex((prevIndex) => prevIndex % updatedData.length)
    } catch (error) {
      console.error("Fail to delete img:", error)
    }
  }

  return (
    <div className="w-full h-96 bg-slate-600">
      <div
        id="carouselExampleIndicators"
        className="carousel slide h-full"
        data-coreui-ride="true"
      >
        <div className="carousel-indicators">
          {data.map((item, index) => (
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

        <div
          className="carousel-inner h-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              } w-full h-full`}
            >
              <img
                src={`http://localhost:3002/images/${item.image}`}
                className="h-full w-full object-cover"
                alt={`Carousel slide ${index + 1}`}
              />
              <button
                className="bg-red-500 text-white mx-4 my-2 px-3 py-2 rounded-full absolute top-0 right-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleImgDelete(item.id)}
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev w-8 h-8 top-1/2 left-10"
          type="button"
          data-coreui-target="#carouselExampleIndicators"
          data-coreui-slide="prev"
          onClick={() =>
            setActiveIndex((prevIndex) =>
              prevIndex === 0 ? data.length - 1 : prevIndex - 1
            )
          }
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>

        <button
          className="carousel-control-next w-8 h-8 top-1/2 right-10"
          type="button"
          data-coreui-target="#carouselExampleIndicators"
          data-coreui-slide="next"
          onClick={() =>
            setActiveIndex((prevIndex) => (prevIndex + 1) % data.length)
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
