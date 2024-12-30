import AddEmployee from "../../modals/AddEmployee.js";

export const Condition= async (req, res) => {
    const username = req.params.name;
    const condition = req.body.condition;
  
    try {
      const UpdatedCondition = await AddEmployee.findOneAndUpdate({name:username}, {$set:{ condition: condition }});
      
      
  
      if (!Condition) {
        return res.status(404).json({ message: 'condition not found' });
      }
  
      return res.status(200).json({UpdatedCondition});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };