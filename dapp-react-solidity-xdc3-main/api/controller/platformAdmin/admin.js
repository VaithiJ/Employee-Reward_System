import CompanyReg from "../../modals/CompanyReg.js";

export const admin = async (req,res,next)=>{
    try {
        const comp12 = await CompanyReg.find();
        res.status(200).json({comp12});
    } catch (err){
        next(err);
    }
}