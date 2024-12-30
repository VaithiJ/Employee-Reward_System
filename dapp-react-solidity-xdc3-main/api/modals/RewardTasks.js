import mongoose from "mongoose";
import  Schema  from "mongoose";
import CompanyReg from "./CompanyReg.js";
import AssignTask from "./AssignTask.js";
import User from "./User.js";

const RewardTaskSchema = new mongoose.Schema({
    // companyName:{
    //     type: String,
    //     ref : CompanyReg
    // },
    EmpName:{
        type : String,
    
    },
    Task:{
        type: String,
    
      
    },
    // taskName:{
    //     type: String,
    //     required : true,
       
    // },
    // taskDescription:{
    //     type : String,
        
    // },
    Deadline:{
        type : Date,
    
      
    },
    Rewards:{
        type: Number,
    }

    // status:{
    //     type : Boolean,
    //     required : true,
    //     default : true
    // },

    
    // tokensPurchased : {
    //     type : Number,
    //     required : true
    // },
    

})

export default mongoose.model("RewardTask", RewardTaskSchema)