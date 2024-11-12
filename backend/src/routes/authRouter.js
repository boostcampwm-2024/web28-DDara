import express from 'express';
import { body } from 'express-validator';
import { login } from '../controllers/authController.js';
import { validationMiddleware } from '../middleware/validationMiddleware.js';

export const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with their ID and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid input (e.g. invalid ID or password)
 *       500:
 *         description: Internal server error
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
  login,
);
