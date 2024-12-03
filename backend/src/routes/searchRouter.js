import express from 'express';
import { query } from 'express-validator';
import { validationMiddleware } from '../middleware/validationMiddleware.js';
import { searchController } from '../controllers/searchController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

export const searchRouter = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: "검색 API"
 *     description: "사용자가 입력한 검색어를 기반으로 네이버 로컬 검색 API를 호출하여 검색 결과를 반환합니다."
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: 검색어
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "검색 결과 반환"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       link:
 *                         type: string
 *                       description:
 *                         type: string
 *       400:
 *         description: "잘못된 요청, 검색어 누락"
 *       500:
 *         description: "서버 오류"
 */
searchRouter.get(
  '/',
  [
    query('query')
      .notEmpty()
      .withMessage('Query parameter is required')
      .isString()
      .withMessage('Query must be a string'),
  ],
  authenticateJWT,
  validationMiddleware,
  searchController,
);
