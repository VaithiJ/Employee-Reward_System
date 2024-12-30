import express from "express";

import { allEmps } from "../../controller/company/allemps.js";
const router= express.Router();


router.get("/empdetails", allEmps);

export default router;