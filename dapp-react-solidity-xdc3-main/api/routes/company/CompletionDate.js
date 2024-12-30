import express from "express";
import { Completiondate } from "../../controller/employee/completiondate.js"
const router = express.Router();

router.put('/completion/:taskId',Completiondate )

export default router;