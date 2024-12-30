import CompanyReg from "../../modals/CompanyReg.js";
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken";


export const registerCompany = async (req, res, next) => {
  try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
  const { comName, comAddress, comEmail, password, mobile , walletAddress } = req.body;

  if (!comName || !comEmail  || !password || !comEmail  || !mobile || !walletAddress ) {
    return res
      .status(400)
      .json({ message: "All the fields must be filled" });
  }

  const newUser = new CompanyReg({comName, comEmail, comAddress, password:hash, mobile, walletAddress});

  
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};
