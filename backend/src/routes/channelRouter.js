import express from 'express';
import { body } from 'express-validator';
import { addGuestController, createChannelController } from '../controllers/channelController.js';
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

/**
 * @swagger
 * /channels/{channelId}/guests:
 *   post:
 *     summary: 'Add guests to an existing channel'
 *     description: 'Add new guests to an existing channel by providing guest information.'
 *     operationId: 'addGuest'
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         description: 'ID of the channel to which guests are being added'
 *         schema:
 *           type: string
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *     requestBody:
 *       description: 'Guest data to be added to the channel'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 'Guest\'s name'
 *                     start_location:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                           description: 'Latitude of the start location'
 *                         lng:
 *                           type: number
 *                           description: 'Longitude of the start location'
 *                     end_location:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                           description: 'Latitude of the end location'
 *                         lng:
 *                           type: number
 *                           description: 'Longitude of the end location'
 *                     path:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           lat:
 *                             type: number
 *                             description: 'Latitude of a waypoint'
 *                           lng:
 *                             type: number
 *                             description: 'Longitude of a waypoint'
 *                     marker_style:
 *                       type: object
 *                       properties:
 *                         color:
 *                           type: string
 *                           description: 'Color for the guest marker'
 *     responses:
 *       200:
 *         description: 'Guests added successfully'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Guests added successfully'
 *       400:
 *         description: 'Invalid input data'
 *       404:
 *         description: 'Channel not found'
 *       500:
 *         description: 'Server error'
 */
channelRouter.post(
  '/:channelId/guests',
  [body('guests').isArray().withMessage('Guests must be an array')],
  validationMiddleware,
  addGuestController,
);
