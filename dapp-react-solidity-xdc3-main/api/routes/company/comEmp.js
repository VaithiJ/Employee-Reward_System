import express from "express";

import { comEmps } from "../../controller/company/comEmps.js";

const router = express.Router();


router.get("/comemps", comEmps)

export default router;
