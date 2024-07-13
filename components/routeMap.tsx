// import React, { useEffect, useState, useRef } from "react";
// import { getAddress } from "@/app/(tap)/main/actions";

// const containerStyle = {
//   width: "100%",
//   height: "330px",
//   marginTop: 10,
// };

// type Location = {
//   lat: number;
//   lng: number;
// };

// const defaultLocation: Location = {
//   lat: 37.5665,
//   lng: 126.978,
// };

// const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

// const Map: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [location, setLocation] = useState<Location>(defaultLocation);
//   const [address, setAddress] = useState<string>("");
//   const [coordinates, setCoordinates] = useState<
//     { lat: number; lng: number }[]
//   >([]);

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       try {
//         const keys = await getMapKey();
//         const coords = keys.map((key) => ({
//           lat: parseFloat(key.latitude),
//           lng: parseFloat(key.longitude),
//         }));
//         setCoordinates(coords);
//       } catch (error) {
//         console.error("Error fetching coordinates:", error);
//       }
//     };

//     fetchCoordinates();
//   }, []);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const currentLocation: Location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setLocation(currentLocation);
//           loadScriptAndInitializeMap(currentLocation);
//         },
//         (error) => {
//           console.error("Error getting location", error);
//           loadScriptAndInitializeMap(defaultLocation);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       loadScriptAndInitializeMap(defaultLocation);
//     }
//   }, []);

//   const loadScriptAndInitializeMap = (location: Location) => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`;
//     script.onload = () => initializeMap(location);
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   };

//   const initializeMap = (location: Location) => {
//     if (mapRef.current) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: location,
//         zoom: 15,
//       });

//       new window.google.maps.Marker({
//         position: location,
//         map,
//       });

//       coordinates.forEach((coord, index) => {
//         new window.google.maps.Marker({
//           position: coord,
//           map,
//           label: `${index + 1}`,
//         });
//       });

//       if (coordinates.length > 1) {
//         new window.google.maps.Polyline({
//           path: coordinates,
//           geodesic: true,
//           strokeColor: "#FF0000",
//           strokeOpacity: 1.0,
//           strokeWeight: 2,
//           map,
//         });
//       }

//       getAddress(location);
//     }
//   };

//   const getAddress = (location: Location) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location }, (results, status) => {
//       if (status === "OK") {
//         if (results && results[0]) {
//           setAddress(results[0].formatted_address);
//         } else {
//           console.error("No results found");
//         }
//       } else {
//         console.error("Geocoder failed due to: " + status);
//       }
//     });
//   };

//   return (
//     <div>
//       <div ref={mapRef} style={containerStyle}></div>
//       <div>
//         <p>{address}</p>
//       </div>
//     </div>
//   );
// };

// export default Map;
