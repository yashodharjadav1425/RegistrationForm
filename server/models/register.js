const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const RegisterSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    mobile : String,
    date : Date,
    password : String,
    address : String
})
//bycrypt
RegisterSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }catch(error){
        next(error)
    }
})
const RegisterModel = mongoose.model("register", RegisterSchema);
module.exports = RegisterModel;