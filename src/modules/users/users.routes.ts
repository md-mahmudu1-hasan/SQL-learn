import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/", userController.creatuser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSignleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
