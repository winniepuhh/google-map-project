import { Marker } from "@react-google-maps/api";

export const MarkerLocation = ({ position }) => {
  return (
    <div className="conatiner">
      <Marker position={position} />
    </div>
  );
};
