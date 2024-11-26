export interface ILocation {
  lat: number | undefined;
  lng: number | undefined;
}

export interface IGuestMarkerStyle {
  color: string | undefined;
}

export interface IGuest {
  id: string | undefined;
  name: string | undefined;
  start_location: ILocation | undefined;
  end_location: ILocation | undefined;
  path: ILocation[] | undefined;
  marker_style: IGuestMarkerStyle | undefined;
}

export interface IUserChannelInfo {
  host_id: string | undefined;
  name: string | undefined;
  guests: IGuest[] | undefined;
}
