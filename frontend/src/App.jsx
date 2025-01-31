import './App.css'
import Login from "./pages/login/login.jsx"
import SignUp from './pages/signup/signup.jsx'
import Home from "./pages/homepage/home.jsx"
import {Navigate, Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import { useAuthContext } from './Context/AuthContext.jsx'

function App() {
  const {authUser} = useAuthContext()

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      <Route path="/signup" element={authUser ? <Home /> : <SignUp />} />
      <Route path="/login" element={authUser ? <Home /> : <Login />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
