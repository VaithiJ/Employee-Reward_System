import AssignTask from "../../modals/AssignTask.js";

export const certify= async (req, res) => {
    const taskId = req.params.taskId;
    const certificates = req.body.certificates;
    console.log("Hiiiiii")
    console.log(certificates)
  
    try {
      const updatedFile = await AssignTask.findByIdAndUpdate(taskId, {$set:{ certificates:certificates }});
      console.log(updatedFile); // <-- log updatedFile to check if it's being updated correctly

      if (!updatedFile) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      return res.status(200).json({updatedFile});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };