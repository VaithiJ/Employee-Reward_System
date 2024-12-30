import express from "express";

// import { verifyTokenn } from "../../utils/verifyUserToken.js";

import { loginUser } from "../../controller/employee/login.js";
const router = express.Router();

// router.get("/checkauthentication", verifyTokenn, (req,res,next)=>{
//     res.send("You are logged")
// })


router.post("/login", loginUser);

export default router;