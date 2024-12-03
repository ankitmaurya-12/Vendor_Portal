const express = require("express");
const bodyParser = require('body-parser'); // Optional 
const mongoose = require("mongoose")
const cors = require("cors");

const UserModel = require("./models/User");

//calling the server
const app= express();

//using middelware
app.use(cors());
app.use(express.json());

//connect with database
mongoose.connect("mongodb://localhost:27017/Vendor_Portal",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to the database");
}
).catch((err)=>{
    console.log("Error connecting to the database", err);
});


//routes
app.get('/', (req, res)=>{
    console.log("home page");
    res.send("How are you !!");
})

//belove working fine for postman
// app.post('/signup', (req, res)=>{
//     UserModel.create(req.body)
//     .then((users)=>{
//         res.json(users);
//     }).catch((err)=>{
//         res.json(err);
//     })
// })


// Signup route 
app.post("/signup", async (req, res) => {
    try {
      const newUser = new UserModel(req.body); // Use the correct UserModel here
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      console.error("Error saving user:", err);
      res.status(400).json({ error: err.message || "Failed to save user" });
    }
  });

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({
        email,
        password,
      });

        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(400).json({ error: err.message || "Failed to log in" });
    }
    }
);

//listening to the server
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});


