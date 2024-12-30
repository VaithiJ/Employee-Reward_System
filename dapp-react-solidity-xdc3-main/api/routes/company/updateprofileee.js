import express from "express";
import { updateprofileee } from "../../controller/company/updateprofileee.js";
const router = express.Router();

router.put('/updateprofileee/:comName', updateprofileee);

export default router;
