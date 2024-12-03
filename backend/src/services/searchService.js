/**
 * @description 네이버 API를 호출하여 검색 결과를 반환하는 서비스
 */
export const searchService = async query => {
  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=10&start=1&sort=random`,
      {
        method: 'GET',
        headers: {
          'X-Naver-Client-Id': 'RwiDUxdYdlPHF1pcM0id',
          'X-Naver-Client-Secret': 'zmxxnHsoM0',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Naver API Error:', errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch search results', error);
  }
};
