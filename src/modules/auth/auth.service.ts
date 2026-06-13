import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const logindb = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  const user = result.rows[0];

  const matchpassword = await bcrypt.compare(password, user.password);

  if (!matchpassword) {
    throw new Error("Invalid password");
  }

  const jwtpayload = { id: user.id, email: user.email, name: user.name };

  const token = jwt.sign(jwtpayload, config.jwtSecret as string, {
    expiresIn: "1d",
  });

  return { token };
};

export const loginService = {
  logindb,
};
