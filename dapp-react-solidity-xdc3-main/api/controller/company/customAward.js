import Reward from "../../modals/reward.js" 
export const customAward = async (req, res, next) => {
    try{
        const { AwardName, tokens } = req.body;
  
    if (!AwardName, !tokens ) {
      return res
        .status(400)
        .json({ message: "All the fields must be filled" });
    }
  
    const newUser = new Reward({AwardName, tokens});
  
    
      const savedUser = await newUser.save();
      console.log(savedUser);
      res.status(200).json(savedUser);
    } catch (err) {
      next(err);
    }
  };