import express from "express";

import {reward1} from "../../controller/company/awaaard.js";
const router= express.Router();


router.get("/award", reward1);

export default router;