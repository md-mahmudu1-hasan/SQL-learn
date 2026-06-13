import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/users/users.routes";
import { profileRouter } from "./modules/profiles/profile.route";
import { pool } from "./db";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/api/auth", authRouter);

export default app;
