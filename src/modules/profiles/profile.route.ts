import { Router } from "express";
import { UserProfilecontroller } from "./profile.controller";

const route = Router();

route.post("/", UserProfilecontroller.addProfile);

export const profileRouter = route;