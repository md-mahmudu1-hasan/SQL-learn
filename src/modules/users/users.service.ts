import { pool } from "../../db";
import type { atleastusers, User } from "./users.type";
import bcrypt from "bcryptjs";

const createuserDB = async (payload: User) => {
  const { name, email, age, password } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users (name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *
        `,
    [name, email, hashedPassword, age],
  );

  delete result.rows[0].password;
  return result;
};

const getSingleUserDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUserDB = async (id: string, payload: atleastusers) => {
  const { name, email, age, password } = payload;

  const result = await pool.query(
    `
        UPDATE users SET name = $1, email = $2, password = $3, age = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *
        `,
    [name, email, password, age, id],
  );
  return result;
};

const DeleteuserDB = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id],
  );
  return result;
};

const getAllUsersDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

export const userDB = {
  createuserDB,
  getSingleUserDB,
  updateUserDB,
  DeleteuserDB,
  getAllUsersDB,
};
