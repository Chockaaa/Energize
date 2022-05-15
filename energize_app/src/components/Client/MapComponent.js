
import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer } from "@react-google-maps/api";
import { Button, Card, Image, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { getHubs } from '../../db/HubsDB'
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
    const [directions, setDirections] = useState(null);
    const imgSources= {
        "1001":"/images/1001.jpg",
        "1002":"/images/1002.jpg",
        "1003":"/images/1003.jpg",
        "1004":"/images/1004.jpg"
    }
    const navigate = useNavigate()
    //hardcoded starting point for map
    const startPoint = { lat: 18.572274, lng: -72.326882 }
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
        height: '500px'
    }))

    const handleOnClick = (selected) => {
        localStorage.setItem('selectedHubName', selected);
        navigate(`/Book`)
    }

    const fetchDirections = (position) => {

        if (!startPoint) return
        const service = new window.google.maps.DirectionsService();
        service.route(
            {
                origin: startPoint,
                destination: position,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);
                }
            }
        )
    }
    return (
        <GoogleMap
            zoom={8}
            center={center}
            mapContainerStyle={mapStyle}
        >
            {directions && <DirectionsRenderer
                directions={directions}
                options={{
                    polylineOptions: {
                        zIndex: 50,
                        strokeColor: "#1976D2",
                        strokeWeight: 5,
                    }
                }
                }
            >
            </DirectionsRenderer>}
            {markers.map((marker) => (
                <Marker
                    key={`${marker.hubLocation.latitude}-${marker.hubLocation._long}`}
                    position={{ lat: marker.hubLocation._lat, lng: marker.hubLocation._long }}
                    onClick={() => {
                        setSelectedMarker(marker)
                        fetchDirections({ lat: marker.hubLocation._lat, lng: marker.hubLocation._long })
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
                        <Card >
                            <img width="100%" height="160px"src={imgSources[selectedMarker.id]}></img>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Hub Name: {selectedMarker.hubName}</ListGroup.Item>
                                    <ListGroup.Item>Current Capacity(Watts): {selectedMarker.hubCurrentCapacity}</ListGroup.Item>
                                    <ListGroup.Item>Maximum Capacity(Watts): {selectedMarker.hubMaxCapacity}</ListGroup.Item>
                                </ListGroup>
                                <Button  size='sm'   value={selectedMarker.hubName}
                                    onClick={(e) => { handleOnClick(e.target.value) }}
                                >Book now</Button>
                        </Card>
                    </InfoWindow>
                </>

            )}

        </GoogleMap>
    );
}