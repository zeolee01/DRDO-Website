import React, { useState } from "react"
import axios from "axios"

function ImageUpload() {
  const [file, setFile] = useState()

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    const formData = new FormData()
    formData.append("image", file)
    axios
      .post("http://localhost:3002/upload", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Succeeded")
        } else {
          console.log("Failure")
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="flex items-center justify-center w-full pt-4 px-4 notice-background">
      <label
        htmlFor="fileInput"
        className="flex items-center border-black bg-white p-2 rounded-md cursor-pointer focus:outline-none"
      >
        <span className="text-gray-500 mr-2">Choose file</span>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFile}
        />
      </label>
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 text-white  bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none"
      >
        Upload Image
      </button>
    </div>
  )
}

export default ImageUpload
