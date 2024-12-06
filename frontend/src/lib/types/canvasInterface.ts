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

export interface IPointWithAlpha {
  lat: number;
  lng: number;
  alpha: number;
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
  location: IPointWithAlpha;
  token: string;
  color: string;
}

export interface IMarkerStyle {
  color: string;
}

export interface IGuestDataInMapProps {
  id: string;
  name: string;
  startPoint: IPoint;
  endPoint: IPoint;
  paths: IPoint[];
  markerStyle: IMarkerStyle;
}

export interface IMapCanvasViewProps {
  lat: number;
  lng: number;
  alpha?: number | null;
  otherLocations?: IOtherLiveLocations[] | null;
  guests?: IGuestDataInMapProps[] | null;
  width: string;
  height: string;
  isMain: boolean;
}
