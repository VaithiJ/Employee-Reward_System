import express from "express";
import { Condition } from "../../controller/employee/condition.js";
import { seeCondition } from "../../controller/employee/seeCondition.js";
const router = express.Router();

router.put('/condition/:name', Condition);
router.get('/condition1', seeCondition)


export default router;
