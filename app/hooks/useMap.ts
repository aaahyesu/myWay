import { useEffect, useRef, useMemo } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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

  // 경로 데이터 미리 가공
  const preProcessedRoutes = useMemo(() => {
    return route.map((coord) => ({
      ...coord,
      latArray: JSON.parse(coord.latitude),
      lngArray: JSON.parse(coord.longitude),
    }));
  }, [route]);

  useEffect(() => {
    if (isMapLoaded.current || !preProcessedRoutes.length) {
      return;
    }

    // Google Maps API 스크립트가 이미 로드되었는지 확인
    if (!window.google) {
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
    } else {
      initializeMap(); // 이미 로드된 경우 바로 지도 초기화
    }
  }, [preProcessedRoutes]);

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
          createMap(userLat, userLng, userLocation);
        },
        () => {
          // 기본 좌표 (대한민국 서울 시청 좌표)
          const defaultLat = 37.5665; // 대한민국 서울 위도
          const defaultLng = 126.978; // 대한민국 서울 경도
          const defaultLocation = new google.maps.LatLng(
            defaultLat,
            defaultLng
          );
          createMap(defaultLat, defaultLng, defaultLocation);
        }
      );
    } else {
      console.error("현재 브라우저에서 위치서비스를 허용하지 않았습니다.");
    }
  };

  const createMap = (
    lat: number,
    lng: number,
    userLocation: google.maps.LatLng
  ) => {
    const map = new google.maps.Map(mapRef.current as HTMLElement, {
      center: { lat, lng },
      zoom: 15,
    });

    const bounds = new google.maps.LatLngBounds();
    const markers: google.maps.Marker[] = [];

    preProcessedRoutes.forEach((coord) => {
      const { latArray, lngArray, id } = coord;
      const color = colorMap[id] || "#D1B2FF";

      // Polyline 추가
      const path = latArray.map((lat: number, index: number) => ({
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

      latArray.forEach((lat: number, index: number) => {
        const position = {
          lat: Number(lat),
          lng: Number(lngArray[index]),
        };

        const markerLocation = new google.maps.LatLng(lat, lngArray[index]);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          userLocation,
          markerLocation
        );

        // 1km 이내의 마커만 추가
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

          const marker = new google.maps.Marker({
            position,
            icon,
          });

          markers.push(marker);
        }
      });
    });

    map.fitBounds(bounds);

    // 마커 클러스터링 적용
    new MarkerClusterer({ map, markers });
  };

  return mapRef;
};

export default useMap;
