import express from "express";

import { emp } from "../../controller/company/empDetail.js";
const router= express.Router();


router.get("/empprofile/:_id", emp);

export default router;