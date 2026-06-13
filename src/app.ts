import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/users/users.routes";
import { profileRouter } from "./modules/profiles/profile.route";
import { pool } from "./db";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.post("/posts", async (req: Request, res: Response) => {
  try {
    await pool.query(
      `INSERT INTO posts (name) VALUES($1) RETURNING *`,
      [req.body.name],
    );
    res.status(201).json({
      success: true,
      message: "Post created successfully",
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    res.status(500).json({});
  }
});

export default app;
