import {  Marker as GoogleMapMarker } from "@react-google-maps/api";

export const Marker = ({ position, deleteMarker }) => {
  return (
    <div className="conatiner">
      <GoogleMapMarker
        position={position}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          deleteMarker(lat, lng);
        }}
      />
    </div>
  );
};
