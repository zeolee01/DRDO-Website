// import React from "react"
// import img1 from "../assets/Croucel/bg1.webp"

// const Croucel = () => {
//   return (
//     <div>
//       <div
//         id="carouselExampleIndicators"
//         class="carousel slide"
//         data-coreui-ride="true"
//       >
//         <div class="carousel-indicators">
//           <button
//             type="button"
//             data-coreui-target="#carouselExampleIndicators"
//             data-coreui-slide-to="0"
//             class="active"
//             aria-current="true"
//             aria-label="Slide 1"
//           ></button>
//           <button
//             type="button"
//             data-coreui-target="#carouselExampleIndicators"
//             data-coreui-slide-to="1"
//             aria-label="Slide 2"
//           ></button>
//           <button
//             type="button"
//             data-coreui-target="#carouselExampleIndicators"
//             data-coreui-slide-to="2"
//             aria-label="Slide 3"
//           ></button>
//         </div>
//         <div className="carousel-inner">
//           <div class="carousel-item active w-full">
//             <img src={img1} className="d-block w-4/5 h-1/5 mx-auto" alt="..." />
//           </div>
//           <div class="carousel-item">
//             <img src={img1} className="d-block w-4/5 h-1/3 mx-auto" alt="..." />
//           </div>
//           <div class="carousel-item">
//             <img src={img1} className="d-block w-4/5 h-1/3 mx-auto" alt="..." />
//           </div>
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-coreui-target="#carouselExampleIndicators"
//           data-coreui-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//         </button>
//         <button
//           class="carousel-control-next"
//           type="button"
//           data-coreui-target="#carouselExampleIndicators"
//           data-coreui-slide="next"
//         >
//           <span class="carousel-control-next-icon" aria-hidden="true"></span>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Croucel

import React from "react"
import img1 from "../assets/Croucel/bg1.webp"

const Croucel = () => {
  return (
    <div className="pt-20 pb-4">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-coreui-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-coreui-target="#carouselExampleIndicators"
            data-coreui-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-coreui-target="#carouselExampleIndicators"
            data-coreui-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-coreui-target="#carouselExampleIndicators"
            data-coreui-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active w-full">
            <img
              src={img1}
              className="h-96 object-cover w-full bg-cover"
              alt="Carousel slide 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src={img1}
              className="h-96 object-cover w-full"
              alt="Carousel slide 2"
            />
          </div>
          <div className="carousel-item">
            <img src={img1} className="h-96 object-cover w-full" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-coreui-target="#carouselExampleIndicators"
          data-coreui-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-coreui-target="#carouselExampleIndicators"
          data-coreui-slide="next"
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