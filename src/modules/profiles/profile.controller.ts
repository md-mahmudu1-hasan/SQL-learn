import type { Request, Response } from "express";
import { profileDB } from "./profiles.service";

const addProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileDB.profileserviceDB(req.body);

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result.rows[0],
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

export const UserProfilecontroller = {
  addProfile,
};
