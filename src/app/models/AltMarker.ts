import { Marker } from "leaflet";

export interface CustomMarker extends Marker {
    id?: string;
}
