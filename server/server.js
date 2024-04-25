const express = require('express')
const mongoose = require('mongoose')
const RegisterModel = require('./models/register')
const LoginModel = require('./models/login')
const cors = require('cors');
// const uri = process.env.URI;

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/Agile");

app.post('/login', (req, res) => {
    
    const { email, password} = req.body;

    try {
        RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if(user.password === password){
                    LoginModel.create({ email, password})
                    res.json("success")
                }else{
                    res.json("password is incorrect")
                }
            } else {
                res.json("No record existed")
            }

        })
        .catch(err => {
            res.status(500).json("Error finding user");
        });
    } catch (error) {
        res.json(error)
    }
});


app.post('/register', (req, res) => {
    
    const { fname, lname, email, mobile, date, password, address } = req.body;

    // Check if the email already exists in the database
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already have an account");
            } else {
                // If the email doesn't exist, create a new user
                RegisterModel.create({ fname, lname, email, mobile, date, password, address })
                    .then(result => {
                        res.json({ fname, lname, email, mobile, date, password, address });
                    })
                    .catch(err => {
                        res.status(500).json("Error creating account");
                    });
            }
        })
        .catch(err => {
            res.status(500).json("Error finding user");
        });
}); 

const port = 3001
app.listen(port, () => console.log(`Example app listening on port ${port}!`))