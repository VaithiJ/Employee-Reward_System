import express from "express";

import { getTasks } from "../../controller/company/getTasks.js";

const router = express.Router();


router.get("/gettasks", getTasks)

export default router;
