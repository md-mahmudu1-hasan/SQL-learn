import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";

const app: Application = express();
const port = config.port;

app.use(express.json());

const pool = new Pool({
  connectionString:config.connectionString,
});

const initDB = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      age INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `);
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, email, age, password } = req.body;
  try {
    const result = await pool.query(
      `
        INSERT INTO users (name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *
        `,
      [name, email, password, age],
    );

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
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
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
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

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
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, age, password } = req.body;
    const result = await pool.query(
      `
        UPDATE users SET name = $1, email = $2, password = $3, age = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *
        `,
      [name, email, password, age, id],
    );

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
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
  }
  catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
      error: err instanceof Error ? err : new Error("Unknown error"),
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
