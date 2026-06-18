import { Router } from "express";
import { UserProfilecontroller } from "./profile.controller";

const route = Router();

route.post("/", UserProfilecontroller.addProfile);
route.get("/", UserProfilecontroller.getAllProfiles);

export const profileRouter = route;