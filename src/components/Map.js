import React, { useState } from "react";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import * as eventsData from "./data.json";

function Map() {
  const [viewport, setViewport] = useState({
    width: "99vw",
    height: "98vh",
    latitude: 43.4643,
    longitude: -80.5204,
    zoom: 15,
    pitch: 40,
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div>
      <div className="sidebar">
        Longitude: {viewport.longitude} Latitude: {viewport.latitude} Zoom:{" "}
        {viewport.zoom}
      </div>
      <ReactMapGL
        className="map-container"
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoiem9oZWJraGFuIiwiYSI6ImNrbjVkdGd1dzAyNG4zMHF2aTA0NHZnbWkifQ.JPHbNZJCUQUBEF1U3hYZ4Q"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        // Changed the map to the cold war theme map
        mapStyle="mapbox://styles/zohebkhan/cknbg7zfg0nu917qjvpi70kbi"
      >
        {eventsData.buildings.map((event) => (
          // Marker getting data from JSON file in data folder
          <Marker
            key={event.id}
            longitude={event.coordinates[1]}
            latitude={event.coordinates[0]}
          >
            <button
              className="button-style"
              onClick={(e) => {
                e.preventDefault();
                setSelectedEvent(event);
                setViewport({
                  ...viewport,
                  longitude: event.coordinates[1],
                  latitude: event.coordinates[0],
                  zoom: 17,
                  transitionDuration: 1000,
                  transitionInterpolator: new FlyToInterpolator(),
                });
              }}
            >
              <img
                src="https://uwaterloo.ca/brand/sites/ca.brand/files/styles/body-500px-wide/public/uploads/images/school-lockup-4.jpg?itok=zvfUEt-6"
                alt=""
                width="25"
                height="25"
              />
            </button>
          </Marker>
        ))}

        {selectedEvent ? (
          // this is for the pop up window
          // need to make a function to search for the summary of the wikipedia

          <Popup
            className="popup-box"
            longitude={selectedEvent.coordinates[1]}
            latitude={selectedEvent.coordinates[0]}
            onClose={() => {
              setViewport({
                ...viewport,
                zoom: 5,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
              });
              setSelectedEvent(null);
            }}
          >
            <div className="box-container">
              <h2 className="event-title">💥{selectedEvent.name}</h2>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
