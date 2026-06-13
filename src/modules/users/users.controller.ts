import type { Request, Response } from "express";
import { userDB } from "./users.service";

const creatuser = async (req: Request, res: Response) => {
  try {
    const result = await userDB.createuserDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
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

const getSignleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userDB.getSingleUserDB(id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows[0],
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
      error: err instanceof Error ? err : new Error("Unknown error"),
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userDB.updateUserDB(id as string, req.body);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
      error: err instanceof Error ? err : new Error("Unknown error"),
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userDB.DeleteuserDB(id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
      error: err instanceof Error ? err : new Error("Unknown error"),
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userDB.getAllUsersDB();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
      error: err instanceof Error ? err : new Error("Unknown error"),
    });
  }
};

export const userController = {
  creatuser,
  getSignleUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
