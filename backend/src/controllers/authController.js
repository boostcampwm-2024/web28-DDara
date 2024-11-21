import { loginUser, registerUser } from '../services/authService.js';
import { ErrorResponseDto } from '../dto/errorResponse.dto.js';
import { ResponseDto } from '../dto/response.dto.js';

/**
 * @description 로그인 컨트롤러
 */
export const loginController = async (req, res) => {
  const { id, password } = req.body;

  try {
    const token = await loginUser(id, password);
    if (!token) {
      return res.status(401).json(new ErrorResponseDto({ message: 'Invalid ID or password' }));
    }
    return res.status(200).json(new ResponseDto({ resultMsg: 'Login successful', data: token }));
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json(new ErrorResponseDto({ message: 'Server error occurred' }));
  }
};

/**
 * @description 회원가입 컨트롤러
 */
export const registerUserController = async (req, res) => {
  try {
    const { id, name, password, email } = req.body;
    const newUser = await registerUser(id, name, password, email);
    return res
      .status(200)
      .json(new ResponseDto({ resultMsg: 'Registration successful', data: newUser }));
  } catch (error) {
    if (error.message === 'User ID already exists') {
      return res.status(409).json(new ErrorResponseDto({ message: 'User ID already exists' }));
    }
    console.error('User registration error:', error);
    return res.status(500).json(new ErrorResponseDto({ message: 'Server error' }));
  }
};
