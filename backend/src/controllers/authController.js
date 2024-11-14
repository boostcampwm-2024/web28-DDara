import { loginUser, registerUser } from '../services/authService.js';

/**
 * @description 로그인 컨트롤러
 */
export const loginController = async (req, res) => {
  const { id, password } = req.body;

  try {
    const token = await loginUser(id, password);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid ID or password' });
    }
    return res.status(201).json({
      success: true,
      message: 'Login successfully',
      data: token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error occurred' });
  }
};

/**
 * @description 회원가입 컨트롤러
 */
export const registerUserController = async (req, res) => {
  try {
    const { id, name, password, email } = req.body;
    const newUser = await registerUser(id, name, password, email);
    return res.status(201).json({
      success: true,
      message: 'Login successfully',
      data: newUser,
    });
  } catch (error) {
    if (error.message === 'User ID already exists') {
      return res.status(409).json({ error: 'User ID already exists' });
    }
    console.error('User registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
