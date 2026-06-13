import type { Request, Response } from "express";
import { loginService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginService.logindb(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data:result,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const authcontroller = {
  login,
};
