import User from "../../modals/User.js";

export const updateprofile= async (req, res) => {
    const username = req.params.name;
    const profile = req.body.profile;
  
    try {
      const updatedprofile = await User.findOneAndUpdate({name:username}, {$set:{ profile: profile }});
      
  
      if (!updatedprofile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      return res.status(200).json({updatedprofile});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };