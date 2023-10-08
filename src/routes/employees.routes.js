import { Router } from "express";
import { deleteEmployees, getEmployee, getEmployees, postEmployees, patchEmployees } from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employees", postEmployees);

router.patch("/employees/:id", patchEmployees);

router.delete("/employees/:id", deleteEmployees);

export default router;
