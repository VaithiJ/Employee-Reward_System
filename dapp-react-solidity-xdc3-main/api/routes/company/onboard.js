import express from "express";

import { onboard } from "../../controller/company/onboard.js";
const router= express.Router();


router.get("/onboard/:_id", onboard);

export default router;