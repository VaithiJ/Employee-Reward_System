import AssignTask from "../../modals/AssignTask.js";

export const updatetask= async (req, res) => {
    const taskId = req.params.taskId;
    const status = req.body.status;
  
    try {
      const updatedTask = await AssignTask.findByIdAndUpdate(taskId, {$set:{ status:status }});
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      return res.status(200).json({updatedTask});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };