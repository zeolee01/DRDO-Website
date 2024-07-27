import React from "react";
import ImageUpload from "./ImageUpload";
import Croucel from "./Croucel"; // Your carousel component

const App = () => {
  return (
    <div>
      <h1>Image Management</h1>
      <ImageUpload />
      <Croucel />
    </div>
  );
};

export default App;