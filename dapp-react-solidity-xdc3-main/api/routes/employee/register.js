import express from "express";
import { registerUser } from "../../controller/employee/register.js";
import { loginUser } from "../../controller/employee/login.js";
const router = express.Router();

router.post("/register", registerUser);


export default router;