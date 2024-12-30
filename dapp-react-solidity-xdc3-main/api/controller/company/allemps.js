import User from "../../modals/User.js";

export const allEmps = async (req, res, next) => {
  try {
    const user = await User.find({}, { name: 1, _id: 1, isOnboarded:1 });
    res.status(200).json({user:user});
  } catch (err) {
    next(err);
  }
};
