import React from "react"
import NavigationBar from "./NavigationBar"
import MapComp from "./MapComponent"

export default function Dashboard() {
 

  return (
    <>
    <NavigationBar/> 
    <div class="col d-flex justify-content-center">
        <h1>Temporary Dashboard Page</h1>
    </div>
    <MapComp></MapComp>
    </>
    
  )
}
