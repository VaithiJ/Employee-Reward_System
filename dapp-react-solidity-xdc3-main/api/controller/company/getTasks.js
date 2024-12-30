import AssignTask from "../../modals/AssignTask.js";

export const getTasks = async (req,res,next)=>{
    try {
        const tasks = await AssignTask.find();
        res.status(200).json({tasks});
    } catch (err){
        next(err);
    }
}