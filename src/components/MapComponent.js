import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const MapComponent = () => {
    const geocodeApiKey = "9131a2ed836148ccbb97c2d80e5ce04f";

    const mapRef = useRef(null);
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");
    const [routeControl, setRouteControl] = useState(null);

    let streetView = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
    let satelliteView = "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}";
    let terrainView = "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}";
    let temperatureView =
        "http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=a13c324b2dcee94896a0abb202e6b9cf";

    // let xyz = `https://maps.openweathermap.org/maps/2.0/weather/1h/TA2/{z}/{x}/{y}?appid=a13c324b2dcee94896a0abb202e6b9cf`;

    const loadCurrentPosition = (latitude, longitude) => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([latitude, longitude], 13);
            L.tileLayer(streetView, {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ["mt0", "mt1", "mt2", "mt3"],
            }).addTo(mapRef.current);
            // adding marker to map
            // L.marker([latitude, longitude]).addTo(map);
        }
    };
    //function to convert places name to geolocation
    const geocodeLocation = async (location) => {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                location
            )}&key=${geocodeApiKey}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return [lat, lng];
        } else {
            throw new Error("Location not found");
        }
    };

    // function to start routing from startLocation to endLocation
    const createRoute = async () => {
        if (!startLocation || !endLocation) return;
        // Adding routing control
        try {
            const [startLat, startLng] = await geocodeLocation(startLocation);
            const [endLat, endLng] = await geocodeLocation(endLocation);
            if (routeControl) {
                mapRef.current.removeControl(routeControl);
            }
            const newRouteControl = L.routing
                .control({
                    waypoints: [
                        L.latLng(startLat, startLng),
                        L.latLng(endLat, endLng),
                    ],
                    routeWhileDragging: true,
                })
                .addTo(mapRef.current);
            setRouteControl(newRouteControl);
        } catch (error) {
            alert(error.message);
        }

        // L.Routing.control({
        //     waypoints: [
        //         L.latLng(latitude, longitude),
        //         L.latLng(28.7041, 77.1025),
        //     ],
        //     routeWhileDragging: true,
        // }).addTo(mapRef.current);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            console.log("hellooooooooo");
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                loadCurrentPosition(latitude, longitude);
            });
        } else {
            loadCurrentPosition(28.7041, 77.1025);
        }
    }, []);

    return (
        <div className="mapRouting">
            <div className="routeSearchBar">
                <input
                    type="text"
                    placeholder="Start location"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="End location"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                />
                <button onClick={createRoute}>Find Route</button>
            </div>
            <div id="map"></div>
        </div>
    );
};
export default MapComponent;
