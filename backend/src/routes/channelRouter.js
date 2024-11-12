import express from 'express';
import { body } from 'express-validator';
import { createChannelController } from '../controllers/channelController.js';
import { validationMiddleware } from '../middleware/validationMiddleware.js';

export const channelRouter = express.Router();

channelRouter.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('host_id').notEmpty().withMessage('Host ID is required'),
  ],
  validationMiddleware,
  createChannelController,
);
