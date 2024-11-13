const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name :{
        type :String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password :{
        type: String,
        rquired: true,
        unique:[true,"password should be unique and strong for security purpose"]
    },
    confirmpassword:{
        type:String,
        required: true
    }

})

module.exports = mongoose.model("UserModel",userSchema)