"use client";
import React from "react";
import useMap from "@/app/hooks/useMap";

type Route = {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
};

type MainMapComponentProps = {
  route: Route[];
};

const MainMapComponent: React.FC<MainMapComponentProps> = ({ route }) => {
  const mapRef = useMap(route);

  return <div ref={mapRef} className="w-full h-80"></div>;
};

export default MainMapComponent;
