import { pool } from "../db.js";

export const pong = async (req, res) => {
    const [result] = await pool.query("select 'pong' as result");
    res.json(result[0]);
  }