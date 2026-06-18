import { pool } from "../../db/index";

const profileserviceDB = async (payload: any) => {
  const { user_id , bio, phone, address } = payload;

  const checkUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [user_id]);

  if (checkUser.rowCount === 0) {
    throw new Error("User not found");
  }

  const result = await pool.query(
    `
        INSERT INTO profiles (user_id , bio , phone , address) VALUES($1, $2, $3, $4) RETURNING *
        `,
    [user_id, bio, phone, address],
  );
  return result;
};

const getAllProfilesDB = async () => {
  const result = await pool.query(`SELECT * FROM profiles`);
  return result;
};

export const profileDB = {
  profileserviceDB,
  getAllProfilesDB
};
