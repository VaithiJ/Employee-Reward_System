import AssignTask from "../../modals/AssignTask.js";

export const taskStatus = async (req, res) => {
    try {
      
      const task = await AssignTask.findOne({ empName: req.params.empName });

  
     
  
      task.isPending = false;
      await task.save();
      console.log(task)
  
      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
