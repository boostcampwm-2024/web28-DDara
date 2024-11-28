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

export const MIN_ZOOM = 7; // 대한민국 전체가 보이는 최소 줌 레벨
export const MAX_ZOOM = 19; // 네이버 지도 최대 줌 레벨