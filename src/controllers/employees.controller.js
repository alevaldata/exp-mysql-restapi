import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM employee");
  res.json(rows);
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    if (rows[0]) return res.json(rows[0]);
    res.status(404).send({
      message: "Employee not found",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const postEmployees = async (req, res) => {
  const { name, salary } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO employee(name, salary) VALUES (?, ?)",
    [name, salary]
  );
  res.send({
    id: rows.insertId,
    name,
    salary,
  });
};

export const patchEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  const [result] = await pool.query(
    "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
    [name, salary, id]
  );
  const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id]);
  if (result.affectedRows) {
    return res.json(rows);
  }
  res.status(404).json({ message: "Employee not found" });
};

export const deleteEmployees = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [id]);
  if (result.affectedRows) return res.sendStatus(204);
  res.status(404).send("Employee not found");
};
