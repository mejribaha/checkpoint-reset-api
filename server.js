//initialize dependencies and import functions
const express = require("express")
//initialize the app
const app = express();
const mongoose= require ('mongoose')
const colors= require ('colors')
const bodyParser = require("body-parser");

require("dotenv").config({path:'./config/.env'}) 

//parsing data: JSON 
app.use(express.json())

//require user model
const User= require('./models/User')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//connection to database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log(`db connected` .cyan))
.catch(err => console.log(`err` .red))

//create the port
const PORT= process.env.PORT || 4400;

//routes

//adding new user: post () to access the req body
app.post ("/newuser", async (req,res)=> {
    const newUser= (req.body);
    try {
        await newUser.save();
        res.status(201).json({message: "success"})
    }
    catch (error){
        res.status(500).send(error);
}
})

//look for an existing user + update
app.put("/update/:id", async (req,res,next)=>{
    try{
        const updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body}
        );
        if(!updateUser){
            res.status(404).send("not found");
        }
        res.status(201).send(updateUser);

    }catch(error){
        res.status(500).send(error);
    }
});

//get all users: get()
app.get("/allusers", async (req,res,next)=>{
    try{
        const users = await  User.find({});
        res.status(201).send(users);
    }catch(error){
        res.status(500).send(error);
    }
});

//delete a user: delete()
app.delete("/user/delete/:id", async (req,res, next) => {
    try {
        await User.findOneAndDelete({_id:req.params.id})
        res.status(201).json({message: "success"})
    }
    catch (error){
    res.status(500).send(error);
    }
})

//running our server
app.listen (PORT, (err)=>
err ? console.log(err) : console.log (`server is running on ${PORT} `));