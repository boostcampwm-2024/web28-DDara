// 대한민국 경계 좌표
export const KOREA_BOUNDS = {
  sw: { lat: 33.0, lng: 124.5 }, // 남서쪽 끝
  ne: { lat: 38.9, lng: 131.9 }, // 북동쪽 끝
};

// 초기 중심점 (대한민국 중앙 근처)
export const DEFAULT_CENTER = {
  lat: (KOREA_BOUNDS.sw.lat + KOREA_BOUNDS.ne.lat) / 2,
  lng: (KOREA_BOUNDS.sw.lng + KOREA_BOUNDS.ne.lng) / 2,
};
