import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth";
import About from "./pages/About";
import Bmi from "./pages/Bmi";
import Coach from "./pages/Coach";
import Diet from "./pages/Diet";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reset from "./pages/Reset";
import Signup from "./pages/Signup";
import Workouts from "./pages/Workouts";
import { Footer, Header, RequireAuth } from "./ui";

const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen min-w-0 overflow-x-hidden bg-navy font-sans text-mist">
        {import.meta.env.PROD && !import.meta.env.VITE_API_URL ? (
          <p className="bg-danger/20 px-4 py-2 text-center text-sm">This build has no VITE_API_URL, so accounts and logs cannot reach the server.</p>
        ) : null}
        <Header />
        <main className="min-w-0">
          <Suspense fallback={<p className="px-4 py-20 text-center text-mist/70">Loading…</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<Forgot />} />
              <Route path="/reset-password" element={<Reset />} />
              <Route path="/bmi" element={<Bmi />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/workout" element={<Workouts />} />
              <Route path="/about" element={<About />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/Fitscreen" element={<Navigate to="/workout" replace />} />
              <Route path="/About" element={<Navigate to="/about" replace />} />
              <Route path="/ForgetPassword" element={<Navigate to="/forgot-password" replace />} />
              <Route path="/Pay" element={<Navigate to="/" replace />} />
              <Route path="/Payment" element={<Navigate to="/" replace />} />
              <Route path="/design-a" element={<Navigate to="/" replace />} />
              <Route path="/design-b" element={<Navigate to="/" replace />} />
              <Route path="/design-c" element={<Navigate to="/" replace />} />
              <Route path="/design-d" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
