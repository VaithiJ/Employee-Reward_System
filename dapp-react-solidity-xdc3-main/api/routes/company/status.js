import express from "express";

import { taskStatus } from "../../controller/company/taskStatus.js";
const router= express.Router();


router.get("/status/:empName", taskStatus);

export default router;