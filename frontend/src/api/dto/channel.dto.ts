export class locationEntity {
  lat: number | undefined;

  lng: number | undefined;
}

export class guestMarkerStyleEntity {
  color: string | undefined;
}

export class guestEntity {
  name: string | undefined;

  start_location: locationEntity | undefined;

  end_location: locationEntity | undefined;

  path: locationEntity[] | undefined;

  marker_style: guestMarkerStyleEntity | undefined;
}

export class createChannelReqEntity {
  name: string | undefined;

  host_id: string | undefined;

  guests: guestEntity[] | undefined;
}

export class guestSimpleEntity {
  id: string | undefined;

  name: string | undefined;
}

export class createChannelResEntity {
  id: string | undefined;

  name: string | undefined;

  host_id: string | undefined;

  guests: guestSimpleEntity[] | undefined;

  created_at: string | undefined;
}

export class channelListEntity {
  id: string | undefined;

  name: string | undefined;

  generated_at: string | undefined;
}

export class getUserChannelsResEntity {
  channels: channelListEntity[] | undefined;
}
