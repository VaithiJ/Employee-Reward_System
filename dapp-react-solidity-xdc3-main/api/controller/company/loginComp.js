import User from "../../modals/CompanyReg.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginComp = async (req, res, next) => {
  const { comName, password, isAdmin } = req.body;

  if (!comName || !password) {
    return res
      .status(400)
      .json({ message: "name and password are required fields" });
  }

  try {
    const user = await User.findOne({ comName:comName});

    if (!user) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
     if (!isMatch) {
      return res.status(401).json({ message: "Invalid name or password" });
     }

     const token = jwt.sign({name: user.comName, password: user.password, isAdmin : user.isAdmin, wallet : user.walletAddress, email : user.comEmail}, process.env.JWT)
     const { password:userPassword,isAdmin,...otherDetails} = await user._doc;
     console.log(token);

     res.cookie('access_token', token, { httpOnly: false }).status(200).json({ message: "Login successful", ...otherDetails});
  } catch (err) {
    next(err);
  }
};
