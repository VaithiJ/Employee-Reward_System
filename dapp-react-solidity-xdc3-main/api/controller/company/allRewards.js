import RewardTasks from "../../modals/RewardTasks.js";

export const allRewards = async (req,res,next)=>{
    try {
        const rewards = await RewardTasks.find();
        res.status(200).json({rewards});
    } catch (err){
        next(err);
    }
}