import { useEffect } from "react";

const MapComponent = () => {
    let streetView = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
    let satelliteView = "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}";
    let terrainView = "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}";
    let temperatureView =
        "http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=a13c324b2dcee94896a0abb202e6b9cf";

    // let xyz = `https://maps.openweathermap.org/maps/2.0/weather/1h/TA2/{z}/{x}/{y}?appid=a13c324b2dcee94896a0abb202e6b9cf`;

    useEffect(() => {
        const loadCurrentPosition = (latitude, longitude) => {
            const map = L.map("map").setView([latitude, longitude], 13);
            L.tileLayer(streetView, {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ["mt0", "mt1", "mt2", "mt3"],
            }).addTo(map);
        };
        if (navigator.geolocation) {
            console.log("helloooooooooo");
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                loadCurrentPosition(latitude, longitude);
            });
        }
        // else {
        //     loadCurrentPosition(28.7041, 77.1025);
        // }
    }, []);

    return <div id="map"></div>;
};
export default MapComponent;
