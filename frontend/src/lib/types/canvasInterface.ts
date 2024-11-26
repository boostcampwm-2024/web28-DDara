export interface IMapCanvasProps {
  width: number;
  height: number;
  initialCenter: { lat: number; lng: number };
  initialZoom: number;
}

export interface IPoint {
  lat: number;
  lng: number;
}

export interface ICanvasPoint {
  x: number;
  y: number;
}

export interface ICanvasScreenProps {
  width: number;
  height: number;
}

export interface IOtherLiveLocations {
  location: IPoint;
  token: string;
}

export interface IMarkerStyle {
  color: string;
}

export interface IGuestDataInMapProps {
  name: string;
  startPoint: IPoint;
  endPoint: IPoint;
  paths: IPoint[];
  markerStyle: IMarkerStyle;
}

export interface IMapCanvasViewProps {
  lat: number;
  lng: number;
  otherLocations?: IOtherLiveLocations[] | null;
  guests?: IGuestDataInMapProps[] | null;
  width: string;
  height: string;
}
