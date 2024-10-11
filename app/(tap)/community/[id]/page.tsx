"use client";
import React, { useState, useEffect, Component } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPosts } from "../action";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Bar from "@/components/common/Bar";
import Comment from "@/components/layout/Comment";
import Recommend from "@/components/layout/Recommend";
import Profile from "@/components/layout/Profile";
import CommuPlace from "@/components/layout/CommuPlace";

export type Post = {
  id: number;
  title: string;
  theme: string;
  content: string;
  photo: string;
  authorEmail: string;
  author: {
    name: string;
  };
  coordinate: {
    address: string;
    latitude: string;
    longitude: string;
    name: string | null;
  }[];
};

interface GoogleWindow extends Window {
  google: typeof google;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

export default function Detail() {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [mapLoaded, setMapLoaded] = useState(false);
  const path = usePathname();
  const id = path.substring("/community/".length);

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPosts = await getPosts();
        const filteredPost = fetchedPosts.find(
          (posting) => posting.id === Number(id)
        );
        setPost(filteredPost);
      } catch (error) {
        console.error("Error fetching post: ", error);
      }
    }
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && !mapLoaded) {
      // Load Google Maps script if not loaded
      if (!document.getElementById("google-maps-script")) {
        const googleMapsScript = document.createElement("script");
        googleMapsScript.id = "google-maps-script";
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        googleMapsScript.async = true;
        window.document.body.appendChild(googleMapsScript);
        googleMapsScript.onload = () => {
          setMapLoaded(true);
          initMap();
        };
      } else {
        initMap();
      }
    }
  }, [post, mapLoaded]);

  const initMap = () => {
    const { google } = window as GoogleWindow;
    const mapElement = document.getElementById("map");

    if (!mapElement) {
      console.error("Map element not found");
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 10,
    });

    const geocoder = new google.maps.Geocoder();
    const addresses = post?.coordinate?.[0]?.address
      ? JSON.parse(post.coordinate[0].address)
      : [];

    const addMarkersAndPolyline = async () => {
      const coordinatesPromises = addresses.map(
        (address: string) =>
          new Promise<{ lat: number; lng: number }>((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
              if (
                status === google.maps.GeocoderStatus.OK &&
                results &&
                results[0]
              ) {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
              } else {
                reject(status);
              }
            });
          })
      );

      try {
        const coordinates = await Promise.all(coordinatesPromises);
        const path = coordinates.map((coord) => ({
          lat: coord.lat,
          lng: coord.lng,
        }));

        const bounds = new google.maps.LatLngBounds();
        coordinates.forEach((coord, index) => {
          new google.maps.Marker({
            position: coord,
            map,
            label: {
              text: (index + 1).toString(),
              color: "white",
            },
          });
          bounds.extend(coord);
        });

        new google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map,
        });

        if (path.length > 0) {
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Error adding markers and polyline: ", error);
      }
    };

    if (addresses.length) {
      addMarkersAndPolyline();
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="py-16">
      <Bar canGoBack title={post.title} bookmark />
      <div id="map" className="w-96 h-80 mb-6"></div>
      <section className="sec1">
        <CommuPlace post={post} />
      </section>
      <section className="sec2">
        <Profile post={post} />
        <div className="relative pt-10">
          <Image
            src="/bg.png"
            alt="Description of the image"
            width="300"
            height="200"
            className="absolute inset-0 z-10"
          />
          <div className="relative z-20">
            <Slider {...settings}>
              {post.photo.split(",").map((photoUrl, index) => (
                <CldImage
                  key={index}
                  src={photoUrl.trim()}
                  className="rounded-lg shadow-md object-cover"
                  alt={`Photo ${index}`}
                  width={200}
                  height={200}
                  crop="fill"
                  gravity="auto"
                />
              ))}
            </Slider>
          </div>
        </div>
        <h2 className="mt-16 space-y-6 text-base text-gray-800">
          {post.content}
        </h2>
      </section>
      <section className="sec3">
        <Recommend />
      </section>
      <section className="sec4 mb-24">
        <Comment />
      </section>
    </div>
  );
}
