import express from "express";
import { registerCompany } from "../../controller/company/registerComp.js";

const router = express.Router();

router.post("/registercompany", registerCompany);


export default router;