import { searchService } from '../services/searchService.js';
import { ResponseDto } from '../dto/response.dto.js';
import { ErrorResponseDto } from '../dto/errorResponse.dto.js';

/**
 * @description 검색 API 컨트롤러
 */
export const searchController = async (req, res) => {
  const { query } = req.query;

  try {
    const data = await searchService(query);
    return res.status(200).json(new ResponseDto({ resultMsg: 'Search successful', data }));
  } catch (err) {
    console.error(err);
    return res.status(500).json(new ErrorResponseDto({ message: 'Server error occurred' }));
  }
};
