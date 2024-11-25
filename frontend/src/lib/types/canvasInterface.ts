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
