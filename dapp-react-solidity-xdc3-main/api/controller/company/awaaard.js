import reward from "../../modals/reward.js";

export const reward1 = async (req,res,next)=>{
    try {
        const award = await reward.find();
        res.status(200).json({award});
    } catch (err){
        next(err);
    }
}