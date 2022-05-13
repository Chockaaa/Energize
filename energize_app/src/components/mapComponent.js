import {useLoadScript} from '@react-google-maps/api'
import Map from  './map';
export default function MapComp() {

    const {isLoaded}= useLoadScript({
        googleMapsApiKey:"AIzaSyA5FKJwPSdMiQpSCPaWS1oo2O7rgCCnBOE",  
    })

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return <Map></Map>
}
