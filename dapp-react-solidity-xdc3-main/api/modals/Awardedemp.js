import mongoose from "mongoose";
import  Schema  from "mongoose";
import CompanyReg from "./CompanyReg.js";
import User from "./User.js";
import reward from "./reward.js";

const awardSchema = new mongoose.Schema({
    emp:{
        type: String,
        ref : User
    },
    compname:{
        type: String,
        ref : CompanyReg
    },
    awardname:{
        type : String,
         ref : reward
    },
    awarddate:{
        type: String,
        default:""
    },
    tokens:{
        type:Number,
        ref: reward
    },
    employeewalletadd:{
        type: String
    }
})

export default mongoose.model("awardemp", awardSchema)