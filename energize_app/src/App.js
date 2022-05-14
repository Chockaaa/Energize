import React from "react"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Booking from "./components/Booking"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"

import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Transactions from "./components/Transactions"
import SolarPanel from "./components/SolarPanel"

function App() {
  return (

        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
              <Route exact path="/Book" element={<PrivateRoute><Booking/></PrivateRoute>} />
              <Route exact path="/Transactions" element={<PrivateRoute><Transactions/></PrivateRoute>} />
              <Route exact path="/SolarPanels" element={<PrivateRoute><SolarPanel/></PrivateRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>

  )
}

export default App
