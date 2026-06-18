import  express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/users/users.routes";
import { profileRouter } from "./modules/profiles/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/api/auth", authRouter);

export default app;
