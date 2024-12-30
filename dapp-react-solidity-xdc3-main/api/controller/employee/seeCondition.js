import AddEmployee from "../../modals/AddEmployee.js";

export const seeCondition = async (req,res,next)=>{
    try {
        const Seecondition = await AddEmployee.find();
        res.status(200).json({Seecondition});
    } catch (err){
        next(err);
    }
}