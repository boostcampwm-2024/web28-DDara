import { loginUser } from '../services/authService.js';

export const login = async (req, res) => {
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
