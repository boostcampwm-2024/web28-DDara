import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUserInDB, findUserById, isUserIdDuplicate } from '../repositories/userRepository.js';

/**
 * @description 로그인 서비스
 * @param {string} name - 사용자 이름
 * @param {string} password - 사용자 비밀번호
 * @returns {object} 로그인된 사용자의 토큰과 id
 */
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
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, userId: user.id };
};

/**
 * @description 회원가입 서비스
 * @param {string} id - 사용자 ID
 * @param {string} name - 사용자 이름
 * @param {string} password - 사용자 비밀번호
 * @param {string} email - 사용자 이메일
 * @returns {object} 새로 생성된 사용자 정보
 */
export const registerUser = async (id, name, password, email) => {
  const isDuplicate = await isUserIdDuplicate(id);
  if (isDuplicate) {
    throw new Error('User ID already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUserInDB(id, name, hashedPassword, email);

  return newUser;
};
