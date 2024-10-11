import { useEffect, useRef, useMemo } from "react";

type Route = {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";
const colorMap: Record<number, string> = {
  1: "#CC3D3D",
  2: "#4374D9",
  3: "#6B8A24",
};
const MAX_DISTANCE = 1000; // 내 위치 1Km 반경

const useMap = (route: Route[]) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const isMapLoaded = useRef(false);

  const memoizedRoute = useMemo(() => route, [route]);

  useEffect(() => {
    if (isMapLoaded.current || !memoizedRoute.length) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
    script.onload = () => {
      isMapLoaded.current = true;
      initializeMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [memoizedRoute]);

  const initializeMap = () => {
    const mapElement = mapRef.current;

    if (!mapElement) {
      console.error("등록된 좌표가 없습니다");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLocation = new google.maps.LatLng(userLat, userLng);

          const map = new google.maps.Map(mapElement, {
            center: {
              lat: userLat,
              lng: userLng,
            },
            zoom: 15,
          });

          const bounds = new google.maps.LatLngBounds();

          memoizedRoute.forEach((coord) => {
            const latArray = JSON.parse(coord?.latitude);
            const lngArray = JSON.parse(coord?.longitude);
            const id = coord.id;
            const color = colorMap[id] || "#D1B2FF";

            const path = latArray.map((lat: any, index: string | number) => ({
              lat,
              lng: lngArray[index],
            }));

            const polyline = new google.maps.Polyline({
              path,
              geodesic: true,
              strokeColor: color,
              strokeOpacity: 1.0,
              strokeWeight: 2,
            });
            polyline.setMap(map);

            latArray.forEach(
              (
                lat: number | google.maps.LatLng | google.maps.LatLngLiteral,
                index: string | number
              ) => {
                const position = {
                  lat: Number(lat),
                  lng: Number(lngArray[index]),
                };

                const markerLocation = new google.maps.LatLng(
                  lat,
                  lngArray[index]
                );
                const distance =
                  google.maps.geometry.spherical.computeDistanceBetween(
                    userLocation,
                    markerLocation
                  );

                // 5km 이내의 마커만 추가
                if (distance <= MAX_DISTANCE) {
                  bounds.extend(markerLocation);

                  const icon = {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="black" strokeWidth="0.1" className="size-8">
                      <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                    </svg>
                  `)}`,
                    scaledSize: new google.maps.Size(35, 35),
                  };

                  new google.maps.Marker({
                    position,
                    map,
                    icon,
                  });
                }
              }
            );
          });

          map.fitBounds(bounds);
        },
        (error) => {
          console.error("위치 서비스를 이용할 수 없습니다:", error.message);
        }
      );
    } else {
      console.error("현재 브라우저에서 위치서비스를 허용하지 않았습니다.");
    }
  };

  return mapRef;
};

export default useMap;
