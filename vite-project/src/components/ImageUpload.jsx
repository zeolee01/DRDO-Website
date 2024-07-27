import React, { useEffect ,useState } from 'react';
import axios from 'axios'

function FileUPload() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    setFile(e. target. files[0])
  }
  useEffect(()=>{
    axios.get('http://localhost:3002/')
    .then(res => {
      setData(res.data[0])
    })
    .catch(err => console.log(err));
  },[])

  const hanldeUpload = () => {
    const formdata = new FormData();
    formdata.append('image',file);
    axios.post('http://localhost:3002/upload', formdata)
    .then(res=> {
      if(res.data.Status === "Success"){
        console.log("Succeeded");
      }
      else{
        console.log("Failure");
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='container'>
      <input type="file" onChange={handleFile}/> <button onClick={hanldeUpload} >Upload</button>
      <br />
      <img src={`http://localhost:3002/images/`+data.image} alt="" />
    </div>
  )
}  

export default FileUPload;