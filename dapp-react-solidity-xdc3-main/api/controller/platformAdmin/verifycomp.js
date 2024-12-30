import CompanyReg from "../../modals/CompanyReg.js";

export const verifycomp = async (req, res) => {
  const comid = req.params._id;
  const isAdmin = req.body.isAdmin;

  try {
    const vercomp = await CompanyReg.findByIdAndUpdate(comid, {$set:{ isAdmin:isAdmin }});

    if (!vercomp) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const savedUser = await vercomp.save();
    console.log(savedUser);
    return res.status(200).json({savedUser});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
