import * as L from 'leaflet'

export interface CustomMarker extends L.Marker {
    id?: string,
}
