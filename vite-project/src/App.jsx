import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import ReduxProvider from "./components/Admin/store";

function App() {
  return (
    <div className="h-full w-full pb-5">
      <ReduxProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </ReduxProvider>
    </div>
  );
}

export default App;