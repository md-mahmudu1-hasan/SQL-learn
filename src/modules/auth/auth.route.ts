import { Router } from "express";
import { authcontroller } from "./auth.controller";

const route = Router();

route.post("/login", authcontroller.login);

export const authRouter = route;