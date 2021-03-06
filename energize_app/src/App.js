import React from "react"
//Common
import StartPage from "./components/StartPage"
import PrivateRoute from "./components/PrivateRoute"

//Client
import Signup from "./components/Client/Signup"
import Login from "./components/Client/Login"
import Booking from "./components/Client/Booking"
import Dashboard from "./components/Client/Dashboard"
import Transactions from "./components/Client/Transactions"
import SolarPanel from "./components/Client/SolarPanel"
import BuyCredits from "./components/Client/BuyCredits"

//Hub
import HubLogin from "./components/Hub/Login"
import HubForgotPassword from "./components/Hub/ForgotPassword"
import HubDashboard from "./components/Hub/HubDashboard"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (

        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/start" element={<StartPage />} />

              <Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
              <Route exact path="/Book" element={<PrivateRoute><Booking/></PrivateRoute>}/>
              <Route exact path="/Transactions" element={<PrivateRoute><Transactions/></PrivateRoute>} />
              <Route exact path="/SolarPanels" element={<PrivateRoute><SolarPanel/></PrivateRoute>} />
              <Route exact path="/BuyCredits" element={<PrivateRoute><BuyCredits/></PrivateRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route path="/hub/login" element={<HubLogin />} />
              <Route path="/hub/forgot-password" element={<HubForgotPassword />} />
              <Route path="/hub" element={<PrivateRoute><HubDashboard /></PrivateRoute>} />
            </Routes>
          </AuthProvider>
        </Router>

  )
}

export default App;
