import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useRef } from "react";
import './Map.css';
import { MarkerLocation } from '../MarkerLocation/MarkerLocation';
import { Marker } from "../Marker/Marker";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
}

export const Map = ({ center, mode, markers, onMarkerAdd, deleteMarker }) => {
  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onClick = useCallback(
    (location) => {
      if (mode === MODES.SET_MARKER) {
        const lat = location.latLng.lat();
        const lng = location.latLng.lng();
        onMarkerAdd({lat, lng});

        console.log(lat, lng);
      }
      // console.log(location);
    },
    [mode, onMarkerAdd]
  );

  console.log(markers);
  return (
    <div className="container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
          <Marker position={center} />
        {/* <MarkerLocation position={center} /> */}
        {markers.map((position) => {
          return <Marker position={position} deleteMarker={deleteMarker} />;
        })}
      </GoogleMap>
    </div>
  );
};
