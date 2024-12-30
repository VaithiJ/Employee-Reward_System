import AddEmployee from "../../modals/AddEmployee.js";

export const comEmps = async (req,res,next)=>{
    try {
        const details = await AddEmployee.find({}, { Name: 1, comId: 1, user:1 , comName:1, Onboard:1, Wallet:1,condition:1});
        res.status(200).json({details});
    } catch (err){
        next(err);
    }
}