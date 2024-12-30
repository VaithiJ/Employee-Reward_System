import express from "express";

import RewardTasks from "../../modals/RewardTasks.js";


export const rewardtask = async (req, res) => {
    
  
  try {
     
      const EmpName = req.params.empName;
      const Task = req.params.task;
      const Deadline = req.params.deadline;
      const Rewards = req.params.rewards;


    //   const { empname, task, deadline, rewards } = req.body;
      const newTask = new RewardTasks({ EmpName:EmpName,Task:Task, Deadline:Deadline, Rewards:Rewards});
      // const user = await User.findById(req.params._id);
    const newRewardTask = await newTask.save();
    res.status(201).json(newRewardTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};