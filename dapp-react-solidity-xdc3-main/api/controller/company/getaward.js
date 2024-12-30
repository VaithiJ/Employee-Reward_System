import Awardedemp from "../../modals/Awardedemp.js";


export const Award = async (req,res,next)=>{
    try {
        const reee = await Awardedemp.find();
        res.status(200).json({reee});
    } catch (err){
        next(err);
    }
}