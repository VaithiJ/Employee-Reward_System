import express from "express";

import { Award } from "../../controller/company/getaward.js";

const router = express.Router();


router.get("/getawards", Award)

export default router;