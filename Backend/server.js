const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/UserModel");

app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB was connected successfully");
  })
  .catch((err) => {
    console.log(`Connection Error:${err}`);
  });

app.post("/register", async(req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already Registered",token);
    }
    if (password !== confirmpassword) {
      return res.status(401).send("password and confirmpassword should match");
    }

    let newUser = new UserModel({
      name,
      email,
      password,
      confirmpassword,
    });
    await newUser.save();
    console.log('User Registered Successfully')
    
    let payload = {
        user : {id: newUser.id}
    }

    jwt.sign(payload,process.env.SECREATE_KEY,{expiresIn:"12hours"},(err,token)=>{
        if(err) throw err
       
       console.log("Generated token",token)
       res.status(200).send({token})

    })



  } 
  catch(err){
    return res.status(500).send(`Internal Server Error ${err}`)
  }
});

app.post("/login", async(req,res)=>{
    const {name,email,password} = req.body
    const exist = await UserModel.findOne({email})
    console.log(name,password)

    if(!exist){
        return res.status(400).send("User does not Exist")
    }

    if(password!==exist.password){
        return res.status(400).send("Invalid password")
    }
    if(exist){
        return res.status(200).send("User successfully logined")
    }

    




    
})

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server is started and running ${PORT}`);
});
