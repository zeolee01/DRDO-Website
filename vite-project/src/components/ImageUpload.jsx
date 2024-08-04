import React, { useState } from "react"
import axios from "axios"

function ImageUpload() {
  const [file, setFile] = useState(null)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    if (!file) {
      console.log("No file selected")
      return
    }

    const formData = new FormData()
    formData.append("image", file)
    axios
      .post("http://localhost:3002/upload", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Succeeded")
        } else {
          console.log("Failure")
          window.location.reload()
        }
      })
      .catch((err) => console.log(err))
  }

  const truncateFileName = (name) => {
    const maxLength = 20
    if (name.length <= maxLength) return name

    const parts = name.split(".")
    const extension = parts.length > 1 ? parts.pop() : ""
    const truncatedName =
      name.substring(0, maxLength - extension.length - 3) + "..." + extension
    return truncatedName
  }

  return (
    <div className="flex items-center justify-center w-full pt-4 py-2 px-4 notice-background">
      <label
        htmlFor="fileInput"
        className="flex items-center w-96 border-black bg-white p-2 rounded-md cursor-pointer focus:outline-none"
      >
        <span className={`mr-2 ${file ? "text-black" : "text-gray-500"}`}>
          {file ? truncateFileName(file.name) : "Choose file"}
        </span>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFile}
          accept="image/*,video/*"
        />
      </label>
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none bg-gradient-to-l from-gray-700 to-black hover:scale-110 hover:bg-gradient-to-l hover:from-gray-800 hover:to-gray-900 border-none transition-transform duration-300 ease-in-out"
      >
        Upload File
      </button>
    </div>
  )
}

export default ImageUpload
