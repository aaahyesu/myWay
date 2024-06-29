"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const destination = {
  lat: 37.440575591901045,
  lng: -4.231433159434073,
};

const GoogleMapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [startPosition, setStartPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [walkingTime, setWalkingTime] = useState(null);
  const [drivingTime, setDrivingTime] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location", error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSetStartPosition = () => {
    if (currentPosition) {
      setStartPosition(currentPosition);
      setMarkers([...markers, currentPosition]);
    }
  };

  const directionsCallback = (response, travelMode) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        const route = response.routes[0].legs[0];
        if (travelMode === google.maps.TravelMode.WALKING) {
          setWalkingTime(route.duration.text);
        } else if (travelMode === google.maps.TravelMode.DRIVING) {
          setDrivingTime(route.duration.text);
        }
      } else {
        console.error("Directions request failed due to " + response.status);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={"AIzaSyAb4wNGFmgyWp9ZSn06pqxwHExSQfBl3eA"}>
      {currentPosition && (
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={10}
          >
            <Marker position={currentPosition} />
            {startPosition && <Marker position={startPosition} />}
            <Marker position={destination} />

            {startPosition && (
              <>
                <DirectionsService
                  options={{
                    destination: destination,
                    origin: startPosition,
                    travelMode: google.maps.TravelMode.DRIVING,
                  }}
                  callback={(response) =>
                    directionsCallback(response, google.maps.TravelMode.DRIVING)
                  }
                />
                <DirectionsService
                  options={{
                    destination: destination,
                    origin: startPosition,
                    travelMode: google.maps.TravelMode.WALKING,
                  }}
                  callback={(response) =>
                    directionsCallback(response, google.maps.TravelMode.WALKING)
                  }
                />
              </>
            )}

            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions,
                }}
              />
            )}
          </GoogleMap>
          <button onClick={handleSetStartPosition}>Set Start Position</button>
          {drivingTime && <p>Estimated driving time: {drivingTime}</p>}
          {walkingTime && <p>Estimated walking time: {walkingTime}</p>}
          <div>
            <h3>Markers:</h3>
            <ul>
              {markers.map((marker, index) => (
                <li key={index}>
                  Latitude: {marker.lat}, Longitude: {marker.lng}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
