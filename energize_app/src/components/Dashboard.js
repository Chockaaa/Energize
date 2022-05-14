import React from "react"
import NavigationBar from "./NavigationBar"
import MapComp from "./mapComponent"

export default function Dashboard() {
  return (
    <>
      <NavigationBar />
      <div className="col d-flex justify-content-center">
        <h1>Temporary Dashboard Page</h1>
    </div>
    <MapComp></MapComp>
    </>
    
  )
}
