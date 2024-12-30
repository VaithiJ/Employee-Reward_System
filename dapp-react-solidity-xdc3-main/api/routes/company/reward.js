import express from "express";

import { rewardtask } from "../../controller/company/rewardTask.js";

const router = express.Router();

router.post("/reward/:empName/:task/:deadline/:rewards", rewardtask)

export default router;
