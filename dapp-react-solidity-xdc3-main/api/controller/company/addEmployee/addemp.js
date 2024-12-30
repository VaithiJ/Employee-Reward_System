import express from "express";
import AddEmployee from "../../../modals/AddEmployee.js";
import User from "../../../modals/User.js";
import nodemailer from 'nodemailer';
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();


const USERR = process.env.GMAIL;
const PASSS = process.env.GMAIL_PASSWORD;
const ASID = process.env.ASID;


export const addEmp = async (req, res) => {
    

  try {
 
      const userId = req.params._id;
      const Name = req.params.name
      const Address = req.params.address;
      const Mobile = req.params.mobile;
      const Email = req.params.email;
      const Wallet = req.params.wallet;
      const Onboard = req.params.isOnboarded;
      const Profilee = req.params.profile


      const { user,comName, comId } = req.body;
      const newUser = new AddEmployee({ user:userId,comName, comId, Name:Name, Address : Address, Mobile:Mobile, Email:Email, Wallet : Wallet, Onboard : Onboard,profile: Profilee});
      // const user = await User.findById(req.params._id);
    const newEmployee = await newUser.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: USERR,
        pass: PASSS
      }
    });

    const mailOptions = {
      from: 'secureklouders@gmail.com',
      to: Email,
      subject: 'You have been onboarded!',
      text: `Dear employee, you have been onboarded by ${comName}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

// Your Twilio account SID and auth token
const accountSid = process.env.ASID;
const authToken = process.env.AUTH;

// Create a new Twilio client
const client = twilio(accountSid, authToken);

// Send a text message
client.messages
  .create({
    body: 'You have been onboarded',
    from: process.env.PHONE,
    to: "+919344614243"
  })
  .then(message => console.log(`Message sent: ${message.sid}`))
  .catch(error => console.error(error));

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};