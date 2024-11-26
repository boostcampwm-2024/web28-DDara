export const getAddressFromCoordinates = (lat: number, lng: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(lat, lng),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          // Reject with an Error object
          reject(new Error('Something went wrong!'));
          return; // Add explicit return
        }
        const result = response.v2; // 검색 결과의 컨테이너
        const { address } = result; // 검색 결과로 만든 주소
        resolve(address.jibunAddress); // Resolve the promise with the address
        // Explicit return for consistency
      },
    );
  });
};
