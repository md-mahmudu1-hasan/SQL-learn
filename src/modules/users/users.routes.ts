import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userController.creatuser);
router.get("/", auth("Admin"), userController.getAllUsers);
router.get("/:id", userController.getSignleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
