import { pool } from '../db/db.js';

/**
 * @description 데이터베이스에 새로운 사용자 생성
 * @param {string} id - 사용자 id
 * @returns {object} id로 찾은 사용자 정보
 */
export const findUserById = async id => {
  const result = await pool.query('SELECT * FROM "main"."user" WHERE id = $1', [id]);
  return result.rows[0];
};

/**
 * @description 사용자 ID 중복 여부 확인
 * @param {string} id - 사용자 ID
 * @returns {boolean} 중복 여부
 */
export const isUserIdDuplicate = async id => {
  const query = `
    SELECT 1 FROM "main"."user"
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);

  return result.rows.length > 0;
};

/**
 * @description 데이터베이스에 새로운 사용자 생성
 * @param {string} id - 사용자 ID
 * @param {string} name - 사용자 이름
 * @param {string} password - 사용자 비밀번호
 * @param {string} email - 사용자 이메일
 * @returns {object} 새로 생성된 사용자 정보
 */
export const createUserInDB = async (id, name, password, email) => {
  const query = `
    INSERT INTO "main"."user" (id, name, password, email)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email;
  `;
  const values = [id, name, password, email];
  const result = await pool.query(query, values);

  return result.rows[0];
};
