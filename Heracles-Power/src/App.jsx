import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

const DesignA = lazy(() => import("./design/DesignA"))
const DesignB = lazy(() => import("./design/DesignB"))
import { Home } from "./screen/Home/Home"
import { LoginScreen } from "./screen/Login & Signup/LoginScreen"
import Profile from "./components/Profile"
import Bmi from "./components/Bmi/Bmi"
import Diet from "./screen/Food/Diet"
import Aboutscreen from "./screen/about/Aboutscreen"
import FitScreen from "./screen/Workout/FitScreen"
import Forget from "./screen/Login & Signup/Forget"
import Paymentt from "./screen/Payment/Paymentt"
import PayScreen from "./screen/Payment/PayScreen"

function App() {
  

  return (
    <>
    <Routes>
    <Route path="/design-a" element={<Suspense fallback={<div className="grid min-h-screen place-items-center bg-neutral-950 text-white">Loading preview…</div>}><DesignA /></Suspense>} />
    <Route path="/design-b" element={<Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#f4f1ea] text-black">Loading preview…</div>}><DesignB /></Suspense>} />
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LoginScreen/>}/>
    <Route path="/signup" element={<LoginScreen/>}/>
    <Route path="/ForgetPassword" element={<Forget />}/>
    <Route path="/bmi" element={<Bmi/>}/>
    <Route path="/profile" element={ <Profile/>}/>
    <Route path="/diet" element={ <Diet />}/>
   <Route path="/About" element={<Aboutscreen />}/>
   <Route path="/Fitscreen" element={ <FitScreen />}/>
   <Route path="/Payment" element={<Paymentt />}/>
   <Route path="/Pay" element={<PayScreen />}/>
  
    </Routes>
    </>
  )
}

export default App
