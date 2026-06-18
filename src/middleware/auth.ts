import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Headerstoken = req.headers.authorization;
      const token = Headerstoken && Headerstoken.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.jwtSecret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [decoded.email],
      );

      const user = userData.rows[0];

      if (userData.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (roles.length > 0 && !roles.includes(user?.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden Access ! You don't have permission to access this resource",
        });
      }

      req.user = decoded;

      next();
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      res.status(401).json({
        success: false,
        message: "Unauthorized Access",
        error: error.message,
      });
    }
  };
};

export default auth;
