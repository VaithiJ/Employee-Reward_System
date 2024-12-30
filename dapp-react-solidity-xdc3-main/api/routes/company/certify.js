import express from "express";
import { certify } from "../../controller/company/certify.js";
const router = express.Router();

router.put('/updateetask/:taskId',certify )

export default router;