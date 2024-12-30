import AssignTask from "../../modals/AssignTask.js"
export const Completiondate= async (req, res) => {
    const taskId = req.params.taskId;
    const completion = req.body.completion;
  
    try {
      const updateCompletion = await AssignTask.findByIdAndUpdate(taskId, {$set:{ completion:completion }});
  
      if (!updateCompletion) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      return res.status(200).json({updateCompletion});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };