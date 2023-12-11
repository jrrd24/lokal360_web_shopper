import React, { useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import { Boy } from "@mui/icons-material";
import theme from "../../../../Theme";

function LocationMarker({ latitude, longitude, shopName }) {
  const [position, setPosition] = useState({
    lat: latitude || null,
    lng: longitude || null,
  });

  const locationOnIcon = new L.divIcon({
    className: "location-on-icon",
    html: ReactDOMServer.renderToString(
      <LocationOnIcon style={{ fontSize: 32, color: "red" }} />
    ),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return position === null ? null : (
    <Marker position={position} icon={locationOnIcon}>
      <Popup>{shopName}</Popup>
    </Marker>
  );
}

function UserLocationMarker({ latitude, longitude }) {
  const [position, setPosition] = useState({
    lat: latitude || null,
    lng: longitude || null,
  });

  const locationOnIcon = new L.divIcon({
    className: "location-on-icon",
    html: ReactDOMServer.renderToString(
      <Boy style={{ fontSize: 40, color: theme.palette.text.main }} />
    ),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={locationOnIcon}>
      <Popup>You Are Here</Popup>
    </Marker>
  );
}

const MapComponent = ({ latitude, longitude, shopName }) => {
  const initialCenter = [latitude || 17.6132, longitude || 121.727]; // Default center coordinates
  const mapRef = useRef();

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
      whenReady={(map) => (mapRef.current = map)}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}"
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        ext="png"
      />
      <LocationMarker
        latitude={latitude}
        longitude={longitude}
        shopName={shopName}
      />
      <UserLocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
