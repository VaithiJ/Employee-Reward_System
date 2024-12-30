import express from "express";
import { awardedemployee } from "../../controller/company/awardemp.js";

const router = express.Router();

router.post("/awardemp/:empname/:compname/:empAddress", awardedemployee);


export default router;