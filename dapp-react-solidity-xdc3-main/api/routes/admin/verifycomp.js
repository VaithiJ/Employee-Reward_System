import express from "express";
import { verifycomp } from "../../controller/platformAdmin/verifycomp.js";
const router = express.Router();

router.put('/verifycom/:_id',verifycomp )

export default router;