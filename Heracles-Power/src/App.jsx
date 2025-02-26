import { Route, Routes } from "react-router-dom"
import { Home } from "./screen/Home/Home"
import { LoginScreen } from "./screen/Login & Signup/LoginScreen"

import Profile from "./components/Profile"
import Bmi from "./components/Bmi/Bmi"
import Diet from "./screen/Food/Diet"
import Aboutscreen from "./screen/about/Aboutscreen"
import FitScreen from "./screen/Workout/FitScreen"



function App() {
  

  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LoginScreen/>}/>
    <Route path="/signup" element={<LoginScreen/>}/>
    <Route path="/bmi" element={<Bmi/>}/>
    <Route path="/profile" element={ <Profile/>}/>
    <Route path="/diet" element={ <Diet />}/>
   <Route path="/About" element={<Aboutscreen />}/>
   <Route path="/Fitscreen" element={ <FitScreen />}/>
    </Routes>
    </>
  )
}

export default App
