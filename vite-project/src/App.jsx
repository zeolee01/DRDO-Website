import "./App.css"
import Home from "./Pages/Home/Home"
import Nav from "./components/Nav"

function App() {
  return (
    <div className="bg-teal-950 h-full w-full pb-5">
      <Nav />
      <Home />
    </div>
  )
}

export default App
