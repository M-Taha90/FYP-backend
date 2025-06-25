// Meetups.jsx
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import treeIcon from "../assets/icons/Tree.png";
import saplingIcon from "../assets/icons/Sapling.png";
import seedIcon from "../assets/icons/Seed.png";
import SlidingBubble from "./SlidingBubble";
import SlidingWindow from "./SlidingWindow";
import { useUser } from '../context/UserContext';

const currentDate = new Date();
const INITIAL_CENTER = [67.02259, 24.85423];
const INITIAL_ZOOM = 11.62;

const Meetups = (user) => {
  const currUser = {
    id: "USR_01", // Example user
    type: 2,
    username:"..",
    email:"..",
    usertype:"..",//1 for user, 2 for organization
    name: "Organization Name",
  };
  const {usertype, setUsertype } = useUser();
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const userType = "Organization"; // NEEDS CHANGE!
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [pinData, setPinData] = useState({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {// Load pin data from server
    
    axios
      .get("http://localhost:4000/meetups")
      .then((response) => {
        const pinsGeoJSON = {
          type: "FeatureCollection",
          features: response.data.map((item) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
            },
            properties: {
              id: item.meetup_id,
              name: item.meetup_name,
              address: item.location_address,
              locationName: item.location_name,
              date: new Date(item.meetup_date),
            },
          })),
        };
        setPinData(pinsGeoJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => { // Initialize map
    if (!pinData) return;
    
    let marker = null;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      speed: 0.2,
      maxDuration: 3000,
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    mapRef.current.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: "metric",
      })
    );

    const markers = [];

    for (const marker of pinData.features) { // Add markers to the map
      // Create the outer marker element (Mapbox anchor)
      const el = document.createElement("div");
      el.className = "marker";
      el.style.position = "absolute";
      el.style.width = "50px";
      el.style.height = currentDate < marker.properties.date ? "94px" : "102px";
      el.style.transform = "translate(-50%, -100%)"; // Center the marker visually
      el.style.pointerEvents = "none"; // Prevent click interference with Mapbox positioning logic
    
      // Create an inner wrapper for the animated content
      const animatedContent = document.createElement("div");
      animatedContent.className = "animated-content";
      animatedContent.style.position = "relative"; // Isolated from Mapbox logic
      animatedContent.style.width = "100%";
      animatedContent.style.height = "100%";
      animatedContent.style.backgroundImage =
        currentDate < marker.properties.date ? `url(${saplingIcon})` : `url(${treeIcon})`;
      animatedContent.style.backgroundSize = "cover";
      animatedContent.style.backgroundPosition = "center";
      animatedContent.style.backgroundRepeat = "no-repeat";
    
      // Append the animated content to the marker element
      el.appendChild(animatedContent);
    
      // Add click event for wobble animation
      animatedContent.addEventListener("click", () => {
        animatedContent.classList.add("animate-wobble");
        setTimeout(() => animatedContent.classList.remove("animate-wobble"), 500);
    
        // Fetch and set meetup data
        axios
          .get(`http://localhost:4000/meetups/${marker.properties.id}`)
          .then((response) => {
            setSelectedMeetup(response.data);
            mapRef.current.flyTo({
              center: marker.geometry.coordinates,
              zoom: 15,
            });
          })
          .catch((error) => console.error("Error fetching meetup details:", error));
      });
    
      // Add the marker to the map
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(mapRef.current);
    }

    
    mapRef.current.on('click', (event) => { // when user clicks new place
      if( usertype === 1) return; // Only organizations can add meetups
      
      // If a marker already exists, remove it
      if (marker) {
        marker.remove();
      }
      const newMark = document.createElement('div');
      newMark.className = 'marker';
      newMark.style.backgroundImage = `url(${seedIcon})`;
      newMark.style.width = `${40}px`;
      newMark.style.height = `${40}px`;
      newMark.style.backgroundSize = '100%';
      // Create a new marker at the clicked location
      marker = new mapboxgl.Marker(newMark)
        .setLngLat(event.lngLat)
        .addTo(mapRef.current);
    });

    mapRef.current.on("load", () => {
      setIsMapLoaded(true);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
      mapRef.current.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinData]);

  return (
    <>
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 transition-all duration-500 ${
          selectedMeetup ? "ml-96" : "ml-0"
        }`}
      >
        <div className="mapContainer h-full" ref={mapContainerRef} />
      </div>

      {isMapLoaded && <SlidingBubble user={user} />}
      <SlidingWindow
        meetupData={selectedMeetup}
        onClose={() => {
          setSelectedMeetup(null);
          mapRef.current.flyTo({
              center: INITIAL_CENTER,
              zoom: INITIAL_ZOOM,
          });
      }}
        user={user}
      />
    </>
  );
};

export default Meetups;
