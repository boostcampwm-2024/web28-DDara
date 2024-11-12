import express from 'express';
import { body } from 'express-validator';
import { createChannelController } from '../controllers/channelController.js';
import { validationMiddleware } from '../middleware/validationMiddleware.js';

export const channelRouter = express.Router();

/**
 * @swagger
 * /channels:
 *   post:
 *     summary: 'Create a new channel'
 *     description: 'Create a new channel with guests and their respective locations and paths.'
 *     operationId: 'createChannel'
 *     requestBody:
 *       description: 'Channel data to be created'
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChannelRequest'
 *       required: true
 *     responses:
 *       201:
 *         description: 'Channel created successfully'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateChannelResponse'
 *       400:
 *         description: 'Invalid input data'
 *       500:
 *         description: 'Server error'
 */
channelRouter.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('host_id').notEmpty().withMessage('Host ID is required'),
  ],
  validationMiddleware,
  createChannelController,
);
