export class itemEntity {
  title: string | undefined;

  link: string | undefined;

  category: string | undefined;

  description: string | undefined;

  telephone: string | undefined;

  address: string | undefined;

  roadAddress: string | undefined;

  mapx: string | undefined;

  mapy: string | undefined;
}

export class searchResultEntity {
  lastBuildDate: string | undefined;

  total: number | undefined;

  start: number | undefined;

  display: number | undefined;

  items: itemEntity[] | undefined;
}
