"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Image from 'next/image';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_ROUTES_API; 

const containerStyle = {
  width: '100%',
  height: '350px'
};

const defaultCenter = {
  lat: 37.5665, // 서울의 좌표
  lng: 126.9780
};

interface Coordinates {
  lat: number;
  lng: number;
}


const CurrentLocationMap: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(null);
  const [markers, setMarkers] = useState<Coordinates[]>([]);

  // 여기에 본인의 API 키를 입력하세요.
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const handleButtonClick = () => {
    if (currentPosition) {
      setMarkers([...markers, currentPosition]);
    }
  };

  return isLoaded ? (
    <div className='py-10'>
      <h1 className="text-xl font-semibold mb-4">나만의 루트 만들기</h1>
      <h2 className="text-md text-gray-400">원하는 위치에서 좌표 찍기 버튼을 눌러 </h2>
      <h2 className="text-md mb-4 text-gray-400">나만의 루트를 생성해보세요</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || defaultCenter}
        zoom={currentPosition ? 15 : 5}
        onClick={(event) => {
          const clickedLatLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          setMarkers([...markers, clickedLatLng]);
        }}
      >
        {currentPosition && (
          <Marker position={currentPosition} />
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            icon={{
              url: '/marker.png',
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        ))}
      </GoogleMap>
      <div className="text-center mt-4 mb-16">
        <button className="d-inline-flex align-items-center" onClick={handleButtonClick}>
          <Image src="/foot.png" alt="Description of the image" width="120" height="120"/>
          <span className="text-base">좌표찍기</span>
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CurrentLocationMap;
