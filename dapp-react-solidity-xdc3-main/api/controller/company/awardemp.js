import express from "express";
import Awardedemp from "../../modals/Awardedemp.js";
export const awardedemployee = async (req, res) => {
  try {
    const employeename = req.params.empname;
    const companyname = req.params.compname;
    const empAddress = req.params.empAddress;

    const {
        awardname,
        awarddate,
        tokens,
    } = req.body;

    // console.log("companyName:", compName);
    // console.log("empName:", employeeName);
    // console.log("address", empWalletAddress)

    const awardemp = new Awardedemp({
    compname: companyname,
      emp: employeename,
      employeewalletadd :  empAddress,
      awardname,
      awarddate,
      tokens // set the new status based on the condition
    });

    const awardedemp = await awardemp.save();
    console.log(awardedemp)
    res.status(201).json(awardedemp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
