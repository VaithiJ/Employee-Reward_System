import express from "express";
import { admin } from "../../controller/platformAdmin/admin.js";

const router = express.Router();

router.get("/admin", admin);


export default router;