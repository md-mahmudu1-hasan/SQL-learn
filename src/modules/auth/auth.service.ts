import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { pool } from "../../db/index";
import config from "../../config/index";

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

  const jwtpayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtpayload, config.jwtSecret as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(jwtpayload, config.jwtRefreshSecret as string, {
    expiresIn: "7d",
  });

  return { token, refreshToken };
};

const generateNewAccesstokebyrefreashToken = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret as string);

  const userData = await pool.query("SELECT * FROM users WHERE email = $1", [
    decoded.email,
  ]);

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }

  const jwtpayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtpayload, config.jwtSecret as string, {
    expiresIn: "2d",
  });

  return { token };
};

export const loginService = {
  logindb,
  generateNewAccesstokebyrefreashToken,
};
