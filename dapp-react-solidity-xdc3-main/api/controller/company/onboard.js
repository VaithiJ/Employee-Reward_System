import User from "../../modals/User.js";

export const onboard = async (req, res) => {
    try {
      
      const user = await User.findById(req.params._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.isOnboarded = true;
      await user.save();
      console.log(user)
  
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
