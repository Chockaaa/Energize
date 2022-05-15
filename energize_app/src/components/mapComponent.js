
import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import {getHubs} from '../db/HubDB'
export default function MapComp() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        getHubs().then((res) => {
          const hubsArray = [];
          for (let i in res) {
            const doc = res[i].data();
            doc.id = res[i].id
            hubsArray.push(doc);
          }
          
          setMarkers([...hubsArray]);
        });
      }, []);
   
    const center = useMemo(() => ({ lat: 18.9712, lng: -73.2852 }), []);
    const mapStyle = useMemo(() => ({
        width: '100%',
        height: '530px'
    }))

    const handleOnClick = (selected) => {
        localStorage.setItem( 'selectedHubName', selected );
        navigate(`/Book`)
    }
    return (
        <GoogleMap
            zoom={8}
            center={center}
            mapContainerStyle={mapStyle}
        >
            {markers.map((marker) => (
                <Marker
                    key={`${marker.hubLocation.latitude}-${marker.hubLocation._long}`}
                    position={{ lat: marker.hubLocation._lat, lng: marker.hubLocation._long }}
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}

                >
                </Marker>
            ))}
            {selectedMarker && (
                <>
                    <InfoWindow
                        position={{ lat: selectedMarker.hubLocation._lat, lng: selectedMarker.hubLocation._long }}
                        onCloseClick={() => {
                            setSelectedMarker(null);
                        }}
                    >
                        <div>
                            <img height='100px'width='250px' src="https://lh5.googleusercontent.com/p/AF1QipORyPFKRG4fdGCPKwITLY9fL8Iv6eH9m6ghJBnf=w408-h274-k-no"></img>
                            <h3>Hub Name: {selectedMarker.hubName}</h3>
                            <h5>Current capacity(Watts): {selectedMarker.hubCurrentCapacity}/{selectedMarker.hubMaxCapacity}</h5>
                            <Button value={selectedMarker.hubName}
                                onClick={(e)=>{handleOnClick(e.target.value)}}
                            >Book now</Button>
                        </div>
                    </InfoWindow>
                </>

            )}

        </GoogleMap>
    );
}