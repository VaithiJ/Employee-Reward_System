import CompanyReg from "../../modals/CompanyReg.js";


export const updateprofileee= async (req, res) => {
    const username = req.params.comName;
    const profile = req.body.profile;
  
    try {
      const updatedprofileC = await CompanyReg.findOneAndUpdate({comName:username}, {$set:{ profile: profile }});
      
  
      if (!updatedprofileC) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      return res.status(200).json({updatedprofileC});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };