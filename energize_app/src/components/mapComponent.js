
import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA5FKJwPSdMiQpSCPaWS1oo2O7rgCCnBOE',
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)

    useEffect(() => {
        setMarkers(
            [
                { title: 'Hub 1', lat: 18.9712, lng: -72 },
                { title: 'Hub 2', lat: 18.9712, lng: -73 },
                { title: 'Hub 3', lat: 18.9712, lng: -74 }

            ]
        )
    }, []);
    const center = useMemo(() => ({ lat: 18.9712, lng: -73.2852 }), []);
    const mapStyle = useMemo(() => ({
        width: '100%',
        height: '400px'
    }))

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

                />
            ))}

            {selectedMarker ? (
                <InfoWindow
                    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                    }}
                >
                    <div>
                        <h2>{selectedMarker.title}</h2>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
    );
}