import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import mongoose from "mongoose";
import userRoute from "./routes/employee/register.js";
import loginRoute from "./routes/employee/login.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import regComp from "./routes/company/registerComp.js";
import loginComp from "./routes/company/loginComp.js";
import addEmployee from "./routes/company/addemp.js"
import getEmp from "./routes/company/getEmp.js";
import emp from "./routes/company/getOne.js";
import comEmp from "./routes/company/comEmp.js"
import onboard from "./routes/company/onboard.js";
import assignTask from "./routes/company/assignTask.js";
import {  verifyUser } from "./utils/verifyToken.js";
import {verifyUserr} from "./utils/verifyUserToken.js"
import getTask from "./routes/company/getTasks.js";
import oneTask from "./routes/company/getTask.js";
import rewards from "./routes/company/reward.js"
import allrewards from "./routes/company/allrewards.js"
import updatetask from "./routes/employee/updatetask.js"
import status from "./routes/company/status.js"
import viewassigned from "./routes/employee/viewassigned.js"
import company from "./routes/admin/admin.js"
import verifycom from "./routes/admin/verifycomp.js"
import completionDate from "./routes/company/CompletionDate.js"
import Updateprofile from "./routes/employee/updateprofile.js"
import Updatedcondition from "./routes/employee/condition.js"
import Certify from "./routes/company/certify.js"
import updateprofileee from "./routes/company/updateprofileee.js"
import award from "./routes/company/awaaard.js"
import awardedemployee from "./routes/company/awardedemp.js"
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import allAward from "./routes/company/getaward.js";
import customAward from "./routes/company/customAward.js";

const app = express()
dotenv.config();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));



app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", ["http://localhost:3001"]);
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
  
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });
  
  const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        key: function (req, file, cb) {
            const employeeName = req.body.employeeName;
            console.log(employeeName)
            cb(null, `EmployeeRewards/TaskCertificates/${employeeName}/` + file.originalname); // use EmployeeRewards folder + original filename as the key in S3
        }
    })
});

const uploadd = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        key: function (req, file, cb) {
          const employeeName = req.body.employeeName;
            cb(null, `EmployeeRewards/PerformanceCertificates/${employeeName}/` + file.originalname); // use EmployeeRewards folder + original filename as the key in S3
        }
    })
});

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGOO);
        console.log("Connected to mongodb")
}       catch (error){
        throw error;
}
};

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongodb disconnected")
})

mongoose.connection.on("connected", ()=>{
    console.log("Mongodb connected")
})

app.use(cookieParser());
app.use(express.json())
app.use("/", userRoute)
app.use("/",loginRoute)
app.use("/", regComp)
app.use("/",regComp)
app.use("/", addEmployee)
app.use("/", getEmp)
app.use("/", emp)
app.use("/", comEmp)
app.use("/",onboard)
app.use("/", assignTask)
app.use("/", getTask)
app.use("/", oneTask)
app.use("/", allrewards)
app.use("/",rewards)
app.use("/",viewassigned)
app.use("/",updatetask)
app.use("/", company)
app.use("/", verifycom)
app.use("/", completionDate)
app.use("/",Updateprofile)
app.use("/", Updatedcondition)
app.use("/", Certify)
app.use("/", award)
app.use("/", updateprofileee)
app.use("/", awardedemployee)
app.use("/", allAward)
app.use("/", customAward);


app.use("/" , loginComp)

app.use((err,req,res,next)=>{
    const errstatus = err.status || 500;
    const errmsg = err.message || "Something went wrong";
    return res.status(errstatus).json({
        success : false,
        status : errstatus,
        message : errmsg,
        stack : err.stack,

    })
})
  
// app.post('/uploadingCertificate', upload.single('certificates'), function (req, res, next) {
    // app.post('/uploadingCertificate', upload.fields([{name:'certificates', maxCount:1}]), async function (req, res) {
    // res.send('File uploaded successfully');
    // if (req.file && req.file.buffer) {
    //     const hash = crypto.createHash('sha256').update(req.files.buffer);
    //     console.log(hash)
    //     // do something with the hash
    //   } else {
    //     console.log("hola amigo")
    //         }
    // var Certificates = req.files['certificates'][0];

    // const hash = crypto.createHash('sha256').update(Certificates.buffer);
    // console.log(hash)

// });






// app.post('/uploadingCertificate', upload.fields([{name:'certificates', maxCount:1}]), async function (req, res) {
//     const file = req.files['certificates'][0];
//     console.log(file)
//     const fileContents = fs.readFileSync(file.path);

//     console.log(fileContents)
//     const fileBuffer = file.buffer;
//     const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
//     console.log('Hash of uploaded file:', hash);
//     res.send('File uploaded successfully');
// });

app.post('/uploadingCertificate', upload.single('certificates'), async function (req, res) {
    const file = req.file;
    console.log('Uploaded file:', file);
  
    // Read the contents of the uploaded file from the S3 bucket
    const params = { Bucket: file.bucket, Key: file.key };
    const fileObject = await s3.getObject(params).promise();
    const fileContents = fileObject.Body;
  
    // Compute the SHA256 hash of the file contents
    const hash = crypto.createHash('sha256').update(fileContents).digest('hex');
    console.log('Hash of uploaded file:', hash);
  
    res.send({uploadStatus:"success", FileHash:hash});
  });
  app.get('/downloadCertificate', (req, res) => {
    const employeeName = req.query.employeeName;
    const hash = req.query.hash;
  
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Prefix: `EmployeeRewards/TaskCertificates/${employeeName}/`
    };
  
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error reading bucket');
        return;
      }
  
      const matchingFile = data.Contents.find((obj) => {
        const fileStream = s3.getObject({ Bucket: process.env.BUCKET_NAME, Key: obj.Key }).createReadStream();
        const fileHash = crypto.createHash('sha256');
        if (obj.Body) {
          fileStream.on('data', (chunk) => fileHash.update(chunk));
          return fileHash.digest('hex') === hash;
        }
      });
      
  
      if (matchingFile) {
        const fileStream = s3.getObject({ Bucket: process.env.BUCKET_NAME, Key: matchingFile.Key }).createReadStream();
        res.attachment(matchingFile.Key);
        fileStream.pipe(res);
      } else {
        res.status(404).send('File not found');
      }
    });
  });



  app.get('/listFiles', (req, res) => {
    const employeeName = req.query.employeeName;
    const hash = req.query.hash;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Prefix: `EmployeeRewards/TaskCertificates/${employeeName}`
    };
  
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error reading bucket');
        return;
      }
  
      const matchingFiles = data.Contents.filter((obj) => {
        return !obj.Key.endsWith('/');
      });
  
      if (matchingFiles.length > 0) {
        let matchingFile = null;
        let promises = [];
  
        for (let i = 0; i < matchingFiles.length; i++) {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: matchingFiles[i].Key
          };
  
          let promise = s3.getObject(getObjectParams).promise().then((data) => {
            const fileContentHash = crypto.createHash('sha256').update(data.Body).digest('hex');
            if (fileContentHash === hash) {
              matchingFile = matchingFiles[i];
              res.setHeader('Content-disposition', `attachment; filename=${matchingFile.Key}`);
              res.setHeader('Content-type', 'application/pdf');
              res.send(data.Body);
            }
          }).catch((err) => {
            console.log(err);
          });
  
          promises.push(promise);
        }
  
        Promise.all(promises).then(() => {
          if (!matchingFile) {
            res.status(404).send('Your file has been changed!!!');
          }
        });
      } else {
        res.status(404).send('No matching files found');
      }
    });
  });
  
  
  app.get('/listAwards', (req, res) => {
    const employeeName = req.query.employeeName;
    const hash = req.query.hash;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Prefix: `EmployeeRewards/PerformanceCertificates/${employeeName}`
    };
  
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error reading bucket');
        return;
      }
  
      const matchingFiles = data.Contents.filter((obj) => {
        return !obj.Key.endsWith('/');
      });
  
      if (matchingFiles.length > 0) {
        let matchingFile = null;
        let promises = [];
  
        for (let i = 0; i < matchingFiles.length; i++) {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: matchingFiles[i].Key
          };
  
          let promise = s3.getObject(getObjectParams).promise().then((data) => {
            const fileContentHash = crypto.createHash('sha256').update(data.Body).digest('hex');
            if (fileContentHash === hash) {
              matchingFile = matchingFiles[i];
              res.setHeader('Content-disposition', `attachment; filename=${matchingFile.Key}`);
              res.setHeader('Content-type', 'application/pdf');
              res.send(data.Body);
            }
          }).catch((err) => {
            console.log(err);
          });
  
          promises.push(promise);
        }
  
        Promise.all(promises).then(() => {
          if (!matchingFile) {
            res.status(404).send('Your file has been changed!!!');
          }
        });
      } else {
        res.status(404).send('No matching files found');
      }
    });
  });
  
  
  
  

 app.post('/uploadCertificate', uploadd.single('PerformanceCertificates'), async function (req, res) {
    const file = req.file;
    console.log('Uploaded file:', file);
  
    // Read the contents of the uploaded file from the S3 bucket
    const params = { Bucket: file.bucket, Key: file.key };
    const fileObject = await s3.getObject(params).promise();
    const fileContents = fileObject.Body;
  
    // Compute the SHA256 hash of the file contents
    const hash = crypto.createHash('sha256').update(fileContents).digest('hex');
    console.log('Hash of uploaded file:', hash);
  
    res.send({uploadStatus:"success", FileHash:hash});
  });



// app.post('/uploadingCertificate', upload.fields([{name:'certificates', maxCount:1}]), async function (req, res) {
//     try{
//     // const file = req.files['certificates'][0];
//     const buffer = fs.readFileSync(req.files['certificates'][0].location);
//     console.log(buffer)

   
    // const hash = crypto.createHash('sha256').update(buffer);
    // const fileHash = hash.digest('hex');
    
    // console.log(fileHash);
//     } catch(error){
//         console.log(error)
//     }
    
//     res.send('File uploaded successfully');
//   });

app.get("/", (req,res)=>{
    res.send("HI")
})


app.listen(8800,()=>{
    connect()
    console.log("Connected")
})
