import {
    GoogleMap,
    Marker,
    InfoWindow
} from "@react-google-maps/api"
import {useMemo,memo,useState,useCallback} from 'react'


const hubs = [
    ['Hub 1',18.9712,-72],
    ['Hub 2',18.9712,-73],
    ['Hub 3',18.9712,-74],
]

function Map(){ 
    // use below for remembering map state
    //const center = useMemo(()=>({lat:18.9712,lng:-72.2852},[]))
    const [map, setMap] = useState(null)
    function setMarkers(map){
        for (let i = 0; i < hubs.length; i++) {
            const hub = hubs[i];
        
            new Marker({
              position: { lat: hub[1], lng: hub[2] },
              map:map,
              title: hub[0],
            });
          }
        
    }
    
    const containerStyle = {
        width: '100%',
        height: '400px'
      };
    const center = {lat:18.9712,lng:-73.2852}
  const onLoad = useCallback(function callback(map) {
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);
    //setMap(map)
    
  }, [])
    
    return (
        <GoogleMap
            zoom={8}
            center={center}
            onLoad={onLoad}
            /*options={{
                disableDefaultUI:true,
                clickableIcons:false
            }}*/
            //onLoad shud set the markers
            //onLoad={map=>{setMarkers(map)}}
            mapContainerStyle={containerStyle}
        >
            <Marker
               position={center}
               title= "Hub 1 !!"
            ></Marker>
            
            <Marker
               position={{lat:18.9712,lng:-72}}
               title= "Hub 2 !!"
            ></Marker>
        </GoogleMap>
     

    )
}

export default memo(Map)