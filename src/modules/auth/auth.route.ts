import { Router } from "express";
import { authcontroller } from "./auth.controller";

const route = Router();

route.post("/login", authcontroller.login);
route.post("/refreash-token", authcontroller.refreashToken);
export const authRouter = route;