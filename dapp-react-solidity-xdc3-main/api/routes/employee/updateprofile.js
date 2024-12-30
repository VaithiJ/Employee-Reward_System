import express from "express";
import { updateprofile } from "../../controller/employee/updateprofile.js";
const router = express.Router();

router.put('/updateprofile/:name', updateprofile);

export default router;
