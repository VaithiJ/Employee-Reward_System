import express from "express";
import { viewassigned } from "../../controller/employee/viewassigned.js";
const router = express.Router();

router.get("/viewtask", viewassigned)

export default router;