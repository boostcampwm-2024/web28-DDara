import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserById } from '../repositories/userRepository.js';

export const loginUser = async (id, password) => {
  const user = await findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // JWT 생성
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, userId: user.id };
};
