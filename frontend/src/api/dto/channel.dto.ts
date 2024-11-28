export class locationEntity {
  title: string | undefined;

  lat: number | undefined;

  lng: number | undefined;
}

export class pathLocationEntity {
  lat: number | undefined;

  lng: number | undefined;
}

export class guestMarkerStyleEntity {
  color: string | undefined;
}

export class guestEntity {
  id: string | undefined;

  name: string | undefined;

  start_location: locationEntity | undefined;

  end_location: locationEntity | undefined;

  path: pathLocationEntity[] | undefined;

  marker_style: guestMarkerStyleEntity | undefined;
}

export class guestReqEntity {
  name: string | undefined;

  start_location: locationEntity | undefined;

  end_location: locationEntity | undefined;

  path: pathLocationEntity[] | undefined;

  marker_style: guestMarkerStyleEntity | undefined;
}

export class createChannelReqEntity {
  name: string | undefined;

  host_id: string | undefined;

  guests: guestReqEntity[] | undefined;
}

export class addChannelReqEntity {
  channel_id: string | undefined;

  guests: guestReqEntity[] | undefined;
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

export class addChannelResEntity {
  success: boolean | undefined;

  message: string | undefined;
}

export class channelListEntity {
  id: string | undefined;

  name: string | undefined;

  generated_at: string | undefined;

  guest_count: number | undefined;
}

export class getUserChannelsResEntity {
  channels: channelListEntity[] | undefined;
}

export class getChannelResEntity {
  id: string | undefined;

  name: string | undefined;

  host_id: string | undefined;

  guests: guestEntity[] | undefined;
}
