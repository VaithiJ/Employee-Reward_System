import mongoose from "mongoose";
import  Schema  from "mongoose";
import CompanyReg from "./CompanyReg.js";
import User from "./User.js";

const RewardSchema = new mongoose.Schema({
    AwardName:{
        type: String,
        ref : CompanyReg
    },
    tokens:{
        type : Number,
         ref : User
    }

})

export default mongoose.model("rewardtask", RewardSchema)