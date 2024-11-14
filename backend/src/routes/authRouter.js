import express from 'express';
import { body } from 'express-validator';
import { loginController, registerUserController } from '../controllers/authController.js';
import { validationMiddleware } from '../middleware/validationMiddleware.js';

export const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인 API
 *     description: 사용자가 로그인할 수 있도록 ID와 비밀번호를 통해 인증 후 토큰을 반환합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: 로그인을 위한 ID와 비밀번호를 포함한 요청 body
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 및 사용자 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: 잘못된 요청, 필수 정보 누락 또는 형식 오류
 *       401:
 *         description: 잘못된 ID나 비밀번호
 *       500:
 *         description: 서버 에러
 */
authRouter.post(
  '/login',
  [
    body('id').notEmpty().withMessage('ID is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validationMiddleware,
  loginController,
);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: "회원가입 API"
 *     description: "사용자가 회원가입을 통해 계정을 생성합니다."
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       "201":
 *         description: "회원가입 성공"
 *       "400":
 *         description: "유효성 검사 실패"
 *       "409":
 *         description: "중복된 사용자 ID"
 *       "500":
 *         description: "서버 오류"
 */
authRouter.post(
  '/register',
  [
    body('id').isLength({ min: 4 }).withMessage('User ID must be at least 4 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  validationMiddleware,
  registerUserController,
);
