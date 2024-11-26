import { ToolTypeContext } from '@/context/ToolTypeContext';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { CurrentUserContext } from '@/context/CurrentUserContext';
import { IPoint } from '@/lib/types/canvasInterface';
import { getAddressFromCoordinates } from '@/utils/map/getAddress';
import { ButtonState } from '../common/enums';

interface ISearchResultItem {
  title: string;
  address: string;
  roadAddress: string;
  lat: number;
  lng: number;
}

interface ISearchBoxProps {
  startMarker?: IPoint | null;
  endMarker?: IPoint | null;
  setMarker: (point: IPoint) => void;
  deleteMarker: () => void;
}
export const SearchBox = (props: ISearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(''); // 검색 입력값 상태
  const [searchResults, setSearchResults] = useState<ISearchResultItem[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const { toolType } = useContext(ToolTypeContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const updateUser = (title: string, lat: number, lng: number) => {
    const updatedLocation = { title, lat, lng };

    // toolType에 따라 start_location 또는 end_location을 업데이트
    if (toolType === ButtonState.START_MARKER) {
      setCurrentUser({
        ...currentUser,
        start_location: updatedLocation, // start_location만 업데이트
      });
    } else if (toolType === ButtonState.DESTINATION_MARKER) {
      setCurrentUser({
        ...currentUser,
        end_location: updatedLocation, // end_location만 업데이트
      });
    }
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    setSearchResults([]);
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
        inputValue,
      )}&display=5&start=1&sort=random`;

      // const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
      //   inputValue,
      // )}&display=10&start=1&sort=random`;

      const response = await fetch(apiUrl, {
        headers: {
          'X-Naver-Client-Id': 'RwiDUxdYdlPHF1pcM0id',
          'X-Naver-Client-Secret': 'zmxxnHsoM0',
        },
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      const formattedResults = data.items.map((item: any) => ({
        title: item.title.replace(/<\/?[^>]+(>|$)/g, ''), // HTML 태그 제거
        address: item.address || item.roadAddress || '주소 정보 없음',
        link: item.link || '#',
        lat: parseFloat(item.mapy) / 1e7,
        lng: parseFloat(item.mapx) / 1e7,
      }));
      console.log(data);
      setSearchResults(formattedResults); // 검색 결과 상태 업데이트
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  /* TODO: 자동검색 로직 수정 필요 */

  useEffect(() => {
    const getAddress = async () => {
      if (toolType === ButtonState.START_MARKER && props.startMarker) {
        if (currentUser.start_location?.title) {
          // title이 비어있을 때 === 부산역 같은 title이 없을때
          return;
        }
        const value = await getAddressFromCoordinates(props.startMarker.lat, props.startMarker.lng);
        setInputValue(value);
      } else if (toolType === ButtonState.DESTINATION_MARKER && props.endMarker) {
        if (currentUser.end_location?.title) {
          return;
        }
        const value = await getAddressFromCoordinates(props.endMarker.lat, props.endMarker.lng);
        setInputValue(value);
      }
    };

    getAddress();
  }, [toolType, props.startMarker, props.endMarker]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 상태 업데이트
  };

  useEffect(() => {
    // 마커가 이미 존재하는 경우 더 이상 검색하지 않도록 방지
    if (toolType === ButtonState.START_MARKER && props.startMarker) {
      return;
    }

    if (toolType === ButtonState.DESTINATION_MARKER && props.endMarker) {
      return;
    }

    if (inputValue.trim()) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);

      // Todo : 요부분 반환값 lint 오류 때문에 해결이 안돼요...
      // eslint-disable-next-line consistent-return
      return () => {
        clearTimeout(delayDebounceFn);
      };
    }
  }, [inputValue, props.startMarker, props.endMarker, toolType]);

  const handleSelectResult = (result: ISearchResultItem) => {
    setInputValue(result.title);
    setSearchResults([]);
    props.setMarker({ lat: result.lat, lng: result.lng });
    updateUser(result.title, result.lat, result.lng);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchResults([]);
    props.deleteMarker();
  };

  return (
    <div className="absolute top-2 z-[6000] w-full px-2">
      {/* 검색 입력 */}
      <div className="border-grayscale-75 text-grayscale-400 flex h-11 w-full rounded border bg-white px-3">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            toolType === ButtonState.START_MARKER ? '출발지를 입력하세요' : '도착지를 입력하세요'
          }
          className="placeholder:text-grayscale-50 text-grayscale-400 h-full w-full px-3 text-xs focus:outline-none"
        />
        <button className="jusify-center flex h-full w-8 items-center" onClick={handleClear}>
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>

      {/* 검색 결과 리스트 */}
      {searchResults.length > 0 && (
        <div className="border-grayscale-75 absolute z-[5000] mt-2 max-h-60 w-full overflow-y-auto border-2 bg-white">
          {loading && <p>로딩 중...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {searchResults.map(result => (
            <button
              type="button"
              key={result.roadAddress}
              onClick={() => handleSelectResult(result)}
              className="flex flex-col items-start gap-2 p-2"
            >
              <div>{result.title}</div>
              <div className="text-grayscale-400">{result.address}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};