
import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

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
        setMarkers(
            [   
                { id:1,title: 'Hub 1', lat: 18.9712, lng: -72, hubCurrentCapacity:1000 ,hubMaxCapacity:2000},
                { id:2,title: 'Hub 2', lat: 18.9682, lng: -73, hubCurrentCapacity:5000 ,hubMaxCapacity:2000 },
                { id:3,title: 'Hub 3', lat: 18.9712, lng: -73.3126, hubCurrentCapacity:2000 ,hubMaxCapacity:2000 }
            ]
        )
    }, []);
    const center = useMemo(() => ({ lat: 18.9712, lng: -73.2852 }), []);
    const mapStyle = useMemo(() => ({
        width: '100%',
        height: '400px'
    }))

    const handleOnClick = (selected) => {
        console.log(selected.value)
        
        navigate(`/Book/${selected.value}`)
    }
    return (
        <GoogleMap
            zoom={8}
            center={center}
            mapContainerStyle={mapStyle}
        >
            {markers.map((marker) => (
                <Marker
                    key={`${marker.lat}-${marker.lng}`}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}

                >
                </Marker>
            ))}
            {selectedMarker && (
                <>
                    <InfoWindow
                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                        onCloseClick={() => {
                            setSelectedMarker(null);
                        }}
                    >
                        <div>
                            <img height='100px'width='250px' src="https://lh5.googleusercontent.com/p/AF1QipORyPFKRG4fdGCPKwITLY9fL8Iv6eH9m6ghJBnf=w408-h274-k-no"></img>
                            <h3>Title: {selectedMarker.title}</h3>
                            <h5>Current capacity(Watts): {selectedMarker.hubCurrentCapacity}/{selectedMarker.hubMaxCapacity}</h5>
                            <Button value={selectedMarker.id}
                                onClick={(e)=>{handleOnClick(e.target)}}
                            >Book now</Button>
                        </div>
                    </InfoWindow>
                </>

            )}

        </GoogleMap>
    );
}