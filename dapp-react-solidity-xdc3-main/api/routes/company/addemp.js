import express from "express";

import User from "../../modals/User.js";
import { addEmp } from "../../controller/company/addEmployee/addemp.js";

const router = express.Router();

router.post("/addemployee/:_id/:name/:address/:mobile/:email/:wallet/:profile", addEmp)

export default router;
