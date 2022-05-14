
import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import {getHubs} from '../db/HubDB'
export default function MapComp() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA5FKJwPSdMiQpSCPaWS1oo2O7rgCCnBOE',
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
        height: '400px'
    }))

    const handleOnClick = (selected) => {
        var idCurArray=selected.value.split(',')
        navigate(`/Book/${idCurArray[0]}/${idCurArray[1]}`)
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
                            <h3>Hub: {selectedMarker.id}</h3>
                            <h5>Current capacity(Watts): {selectedMarker.hubCurrentCapacity}/{selectedMarker.hubMaxCapacity}</h5>
                            <Button value={[selectedMarker.id,selectedMarker.hubCurrentCapacity].join()}
                                onClick={(e)=>{handleOnClick(e.target)}}
                            >Book now</Button>
                        </div>
                    </InfoWindow>
                </>

            )}

        </GoogleMap>
    );
}