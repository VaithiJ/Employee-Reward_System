import express from "express";

import { allRewards } from "../../controller/company/allRewards.js";

const router = express.Router();


router.get("/reward", allRewards)

export default router;