export interface IPoint {
  lat: number;
  lng: number;
}

export interface IGuestMarkerStyle {
  color: string;
}

export interface IGuest {
  id: string;
  name: string;
  startPoint: IPoint;
  endPoint: IPoint;
  paths: IPoint[];
  markerStyle: IGuestMarkerStyle;
}

export interface IGuestData {
  id: string;
  name: string;
  markerStyle: IGuestMarkerStyle;
}

export interface IChannelInfo {
  channelId: string;
  hostId: string;
  name: string;
  guests: IGuest[];
}
