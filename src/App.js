import "./App.css";
import { useJsApiLoader } from "@react-google-maps/api";
import { MODES, Map } from "./components/Map";
import { useCallback, useState } from "react";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";

const API_KEY = process.env.REACT_APP_API_KEY;

console.log(API_KEY);

const initialCenter = {
  lat: 49.842957,
  lng: 24.031111,
};

const libraries = ["places"];

function App() {
  const [center, setCenter] = useState(initialCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
    console.log(mode);
  }, [mode]);

  const onMarkerAdd = useCallback(
    (coordinates) => {
      setMarkers([...markers, coordinates]);
    },
    [markers]
  );

  const clearAll = useCallback(() => {
    setMarkers([]);
  }, []);

  const deleteMarker = (lat, lng) => {
    setMarkers(prevState => prevState.filter(marker => marker.lat !== lat || marker.lng !== lng))
  }

  return (
    <div className="App">
      <div className="addressSearchContainer">
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        <button className="modeToggle" onClick={toggleMode}>
          Set markers
        </button>
        <button className="modeToggle" onClick={clearAll}>
          Clear All
        </button>
      </div>

      {isLoaded ? (
        <Map
          center={center}
          mode={mode}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
          deleteMarker={deleteMarker}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default App;
