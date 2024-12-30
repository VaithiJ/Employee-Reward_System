import express from "express";
import { oneTask } from "../../controller/company/oneTask.js";

const router = express.Router();

router.get("/gettask/:id", oneTask);

export default router;
