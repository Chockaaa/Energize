import React from "react"
import NavigationBar from "./NavigationBar"
import MapComp from "./MapComponent"

export default function Dashboard() {
  return (
    <>
      <NavigationBar />
      <div className="col d-flex justify-content-center">
        <h1>Map of Hubs</h1>
      </div>
    <MapComp></MapComp>
    </>
    
  )
}
