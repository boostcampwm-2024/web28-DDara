import { ToolTypeContext } from '@/context/ToolTypeContext';
import { UserContext } from '@/context/UserContext';
import React, { useContext, useState } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { CurrentUserContext } from '@/context/CurrentUserContext';
import { ButtonState } from '../common/enums';

interface ISearchResultItem {
  title: string;
  address: string;
  link: string;
  lat: number;
  lng: number;
}

export const SearchBox = () => {
  const [inputValue, setInputValue] = useState(''); // 검색 입력값 상태
  const [searchResults, setSearchResults] = useState<ISearchResultItem[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const { users, setUsers } = useContext(UserContext);
  const { toolType } = useContext(ToolTypeContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const updateUser = (title: string, lat: number, lng: number) => {
    // `currentUser`의 정보를 사용하여 대상 사용자를 찾아서 업데이트
    const targetUser = currentUser;
    console.log(targetUser);

    // `users` 배열을 순회하면서 `currentUser`에 해당하는 사용자를 찾고, 업데이트
    const updatedUsers = users.map(user => {
      if (user.id === targetUser.id) {
        // `targetUser`와 같은 id를 가진 사용자를 찾음
        if (toolType === ButtonState.START_MARKER) {
          return {
            ...user,
            start_location: {
              title,
              lat,
              lng,
            },
          };
        }
        if (toolType === ButtonState.DESTINATION_MARKER) {
          return {
            ...user,
            end_location: {
              title,
              lat,
              lng,
            },
          };
        }
      }
      return user; // 나머지 사용자들은 그대로 반환
    });

    console.log(updatedUsers);

    // `setUsers`를 사용해 업데이트된 사용자 목록으로 상태를 갱신
    setUsers(updatedUsers);

    // `currentUser`도 갱신 (선택적, 필요 시)
    setCurrentUser({
      ...currentUser,
      start_location:
        toolType === ButtonState.START_MARKER ? { title, lat, lng } : currentUser.start_location,
      end_location:
        toolType === ButtonState.DESTINATION_MARKER
          ? { title, lat, lng }
          : currentUser.end_location,
    });
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
        inputValue,
      )}&display=10&start=1&sort=random`;

      //   const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
      //     inputValue,
      //   )}&display=10&start=1&sort=random`;

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
        lat: parseFloat(item.mapy) / 1e7, // 위도 값 변환
        lng: parseFloat(item.mapx) / 1e7, // 경도 값 변환
      }));
      console.log(data);
      setSearchResults(formattedResults); // 검색 결과 상태 업데이트
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 상태 업데이트
  };

  const handleSelectResult = (result: ISearchResultItem) => {
    setInputValue(result.title); // 선택한 결과로 inputValue를 업데이트
    setSearchResults([]); // 결과 리스트를 닫음
    updateUser(result.title, result.lat, result.lng);
    console.log(`위도: ${result.lat}, 경도: ${result.lng}`);
  };

  const handleClear = () => {
    setInputValue(''); // 입력값 초기화
    setSearchResults([]); // 검색 결과 초기화
  };

  return (
    <div className="relative">
      {/* 검색 입력 */}
      <div className="border-grayscale-75 text-grayscale-400 flex h-11 w-full rounded border px-3">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
          className="placeholder:text-grayscale-50 text-grayscale-400 h-11 w-full px-3 text-xs focus:outline-none"
        />
        <button className="flex h-full w-8 items-center" onClick={handleSearch}>
          <IoMdSearch className="h-6 w-6" />
        </button>
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
              key={result.link}
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
