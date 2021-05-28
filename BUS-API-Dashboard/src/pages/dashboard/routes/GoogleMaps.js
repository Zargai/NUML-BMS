import React, { useEffect } from "react";
import GoogleMap from "google-map-react";
function GoogleMaps({ setMark, markers, setMarkers, mark }) {
  const YOUR_GOOGLE_MAP_API_KEY = "AIzaSyA7jbl5TnQofa0ALQyN6uWXoui92Kw_Otg";
  const center = [33.738045, 73.084488];
  const zoom = 10;
  const K_WIDTH = 40;
  const K_HEIGHT = 40;

  const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: "absolute",
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: "5px solid #f44336",
    borderRadius: K_HEIGHT,
    backgroundColor: "white",
    textAlign: "center",
    color: "#3f51b5",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  };
  const MyGreatPlace = (props) => {
    return <div style={greatPlaceStyle}>{props.title}</div>;
  };

  return (
    <div style={{ height: "40vh", width: "100%" }}>
      <GoogleMap
        apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={center}
        key="mapx"
        zoom={zoom}
        onClick={(event) => {
          setMark({
            title: "",
            lat: event.lat || null,
            long: event.lng || null,
            disabled: Boolean,
          });
        }}
        // yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded
        // onGoogleApiLoaded={({ map, maps }) => ModelsMap(map, maps)}
      >
        {markers.map((m, i) => (
          <MyGreatPlace
            key={i}
            lat={m.lat || null}
            lng={m.long || null}
            text={m.title || ""}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default GoogleMaps;
