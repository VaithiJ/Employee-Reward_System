import User from "../../modals/User.js";

export const emp = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params._id);
    console.log(user)
    res.status(200).json({user:user});
  } catch (err) {
    next(err);
  }
};
