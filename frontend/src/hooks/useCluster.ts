import { IMarkerStyle } from '@/lib/types/canvasInterface';

interface IPixel {
  x: number;
  y: number;
}

interface IMarker {
  lat: number;
  lng: number;
}

export interface ICluster {
  markers: IMarker[];
  center: IMarker;
  color: IMarkerStyle;
}

export const useCluster = () => {
  const calculateDistance = (pointA: IPixel, pointB: IPixel) => {
    // 유클리드 거리 계산 (픽셀 단위)
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const createClusters = (markers: IMarker[], color: IMarkerStyle, map: naver.maps.Map) => {
    const projection = map.getProjection();
    const latLngToCanvasPoint = (latLng: naver.maps.LatLng): IPixel | null => {
      if (!map || !projection) return null;

      const lat = latLng.lat();
      const lng = latLng.lng();

      const coord = projection.fromCoordToOffset(new naver.maps.LatLng(lat, lng));
      const mapSize = map.getSize();
      const mapCenter = map.getCenter();
      const centerPoint = projection.fromCoordToOffset(mapCenter);

      return {
        x: coord.x - (centerPoint.x - mapSize.width / 2),
        y: coord.y - (centerPoint.y - mapSize.height / 2),
      };
    };

    const clusters: ICluster[] = [];
    const visited = new Set();
    const clusterRadius = 50;

    if (!projection) {
      console.error('Projection을 가져올 수 없습니다.');
      return clusters;
    }

    markers.forEach((marker, index) => {
      if (visited.has(index)) return;

      // 새로운 클러스터 생성
      const cluster = { markers: [marker], center: marker, color };
      visited.add(index);

      // 현재 마커와 가까운 마커 찾기
      for (let i = index + 1; i < markers.length; i++) {
        if (!visited.has(i)) {
          const markerPixel = latLngToCanvasPoint(new naver.maps.LatLng(marker.lat, marker.lng));
          const otherMarkerPixel = latLngToCanvasPoint(
            new naver.maps.LatLng(markers[i].lat, markers[i].lng),
          );
          if (markerPixel !== null && otherMarkerPixel !== null) {
            const distance = calculateDistance(markerPixel, otherMarkerPixel);
            if (distance < clusterRadius) {
              cluster.markers.push(markers[i]);
              visited.add(i);
            }
          }
        }
      }
      // 클러스터의 중심 계산: 마커들의 위도와 경도의 평균값
      const centerLat = cluster.markers.reduce((sum, m) => sum + m.lat, 0) / cluster.markers.length;
      const centerLng = cluster.markers.reduce((sum, m) => sum + m.lng, 0) / cluster.markers.length;

      cluster.center = { lat: centerLat, lng: centerLng };
      if (cluster.markers.length > 1) {
        clusters.push(cluster);
      }
    });

    return clusters;
  };

  return { createClusters };
};
