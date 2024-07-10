import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"


function App() {

  return (
    <div className="min-w-full min-h-fit bg-red-600">
      <div className="min-w-full min-h-fit">
        <Header />
      </div>
      <div className="min-w-full min-h-fit">
        <Outlet />
      </div>
      <div className="min-w-full min-h-fit">
        <Footer />
      </div>
    </div>
  )
}

export default App
