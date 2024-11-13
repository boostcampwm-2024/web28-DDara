import express from 'express';
import { body, param } from 'express-validator';
import {
  addGuestController,
  createChannelController,
  getChannelGuestInfoController,
  getChannelInfoController,
  getUserChannelsController,
} from '../controllers/channelController.js';
import { validationMiddleware } from '../middleware/validationMiddleware.js';

export const channelRouter = express.Router();

// 채널 생성 API 경로
/**
 * @swagger
 * paths:
 *   /channel:
 *     post:
 *       summary: '새로운 채널 생성 API'
 *       description: '채널 이름, 주인, 게스트 정보를 포함하여 채널을 생성합니다.'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateChannelRequest'
 *       responses:
 *         201:
 *           description: '채널 생성 성공'
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateChannelResponse'
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

// 게스트 추가 API 경로
/**
 * @swagger
 * paths:
 *   /channel/{channelId}/guests:
 *     post:
 *       summary: '게스트 추가 API'
 *       description: '특정 채널에 게스트를 추가합니다.'
 *       parameters:
 *         - name: 'channelId'
 *           in: 'path'
 *           required: true
 *           schema:
 *             type: 'string'
 *           description: '채널의 고유 ID'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddGuestRequest'
 *       responses:
 *         200:
 *           description: '게스트 추가 성공'
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AddGuestResponse'
 */
channelRouter.post(
  '/:channelId/guests',
  [body('guests').isArray().withMessage('Guests must be an array')],
  validationMiddleware,
  addGuestController,
);

// 채널 정보 조회 API 경로
/**
 * @swagger
 * paths:
 *   /channel/{id}:
 *     get:
 *       summary: '채널 정보 조회 API'
 *       description: '특정 채널의 정보를 조회합니다.'
 *       parameters:
 *         - name: 'id'
 *           in: 'path'
 *           required: true
 *           schema:
 *             type: 'string'
 *           description: '채널의 고유 ID'
 *       responses:
 *         200:
 *           description: '채널 정보 조회 성공'
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ChannelResponse'
 */
channelRouter.get(
  '/:id',
  [param('id').notEmpty().withMessage('Channel ID is required')],
  validationMiddleware,
  getChannelInfoController,
);

// 게스트 정보 조회 API 경로
/**
 * @swagger
 * paths:
 *   /channel/{channelId}/guest/{guestId}:
 *     get:
 *       summary: '게스트 정보 조회 API'
 *       description: '특정 채널 내의 게스트 정보를 조회합니다.'
 *       parameters:
 *         - name: 'channelId'
 *           in: 'path'
 *           required: true
 *           schema:
 *             type: 'string'
 *           description: '채널의 고유 ID'
 *         - name: 'guestId'
 *           in: 'path'
 *           required: true
 *           schema:
 *             type: 'string'
 *           description: '게스트의 고유 ID'
 *       responses:
 *         200:
 *           description: '게스트 정보 조회 성공'
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GuestResponse'
 */
channelRouter.get(
  '/:channelId/guest/:guestId',
  [
    param('channelId').notEmpty().withMessage('Channel ID is required'),
    param('guestId').notEmpty().withMessage('Guest ID is required'),
  ],
  validationMiddleware,
  getChannelGuestInfoController,
);

/**
 * @swagger
 * paths:
 *   /channel/user/{userId}:
 *     get:
 *       summary: '사용자가 host인 채널 목록 반환 API'
 *       description: 'userId를 기준으로 해당 사용자가 host인 채널 목록을 반환합니다.'
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: '사용자의 ID'
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: '채널 목록 반환 성공'
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetUserChannelsResponse'
 *         404:
 *           description: '해당 사용자가 host인 채널이 없음'
 *         500:
 *           description: '서버 오류'
 */
channelRouter.get(
  '/user/:userId',
  [param('userId').notEmpty().withMessage('User ID is required')],
  validationMiddleware,
  getUserChannelsController,
);
