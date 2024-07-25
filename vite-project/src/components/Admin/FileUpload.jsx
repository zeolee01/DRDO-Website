import React, { useState } from "react"

const FileUpload = () => {
  const [file, setFile] = useState()

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {}
  return (
    <div className="container">
      <input type="file" name="" id="" onChange={handleFile} />
      {/* <button type="button" onClick={handelUpload}>
        Upload
      </button> */}
    </div>
  )
}

export default FileUpload
