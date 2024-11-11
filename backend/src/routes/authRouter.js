import express from 'express';
import { body } from 'express-validator';
import { login } from '../controllers/authController.js';
import validationMiddleware from '../middleware/validationMiddleware.js';

export const router = express.Router();

router.post(
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
