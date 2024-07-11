import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "350px",
  marginTop: 5,
};

const defaultLocation: Location = {
  lat: 37.5665, // Default latitude (e.g., Seoul)
  lng: 126.978, // Default longitude (e.g., Seoul)
};

type Location = {
  lat: number;
  lng: number;
};

const Map: React.FC = () => {
  const [location, setLocation] = useState<Location>(defaultLocation);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(currentLocation);
          getAddress(currentLocation);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getAddress = (location: Location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK") {
        if (results && results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
        <Marker position={location} />
      </GoogleMap>
      <div>
        <p>{address}</p>
      </div>
    </LoadScript>
  );
};

export default Map;
