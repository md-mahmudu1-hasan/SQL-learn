import type { Request, Response } from "express";
import { loginService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginService.logindb(email, password);

    const { token, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite:"lax"
    });

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

const refreashToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }
    const result = await loginService.generateNewAccesstokebyrefreashToken(refreshToken);
    res.status(200).json({
      success: true,
      message: "Refresh token generated successfully",
      data: result,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: "Refresh token failed",
      error: error.message,
    });
  }
};

export const authcontroller = {
  login,
  refreashToken,
};
