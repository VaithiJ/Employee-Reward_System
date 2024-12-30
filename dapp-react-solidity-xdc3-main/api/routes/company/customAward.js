import express from "express";
import { customAward } from "../../controller/company/customAward.js";
const router = express.Router();

router.post("/customAward", customAward);


export default router;