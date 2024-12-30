import express from "express";
import { assignTask } from "../../controller/company/assignTask.js";

const router = express.Router();

router.post("/assigntask/:employeeName/:compName/:empAddress", assignTask);


export default router;