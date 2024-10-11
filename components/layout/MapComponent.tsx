import React from "react";
import useMap from "../app/hooks/useMap";

type Route = {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
};

const MapComponent = ({ route }: { route: Route[] }) => {
  const mapRef = useMap(route);

  return <div ref={mapRef} className="w-full h-80"></div>;
};

export default MapComponent;
