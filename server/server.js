const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser'); // Optional 
const mongoose = require("mongoose")
const cors = require("cors");

const UserModel = require("./models/User");
const DiscountRequest = require("./models/Discount");

//calling the server
const app= express();

//using middelware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// const uri = "mongodb+srv://ankitmaurya:Ankit123@cluster0.ze7bq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//connect with database
mongoose.connect("mongodb://localhost:27017/Vendor_Portal",{
// mongoose.connect(uri,{
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
    res.send("Vendor portal API");
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

// // Route to get all users
// app.get("/api/users", async (req, res) => {
//     try {
//         const users = await UserModel.find();
//         res.status(200).json(users);
//     } catch (err) {
//         console.error("Error fetching users:", err);
//         res.status(400).json({ error: err.message || "Failed to fetch users" });
//     }
// });


// Discount Request Routes

// Create new discount request
app.post("/api/discount-requests", async (req, res) => {
    try {
        const {
            salesOrder,
            orderType,
            netValue,
            customer,
            discountPercentage,
            discountAmount,
            finalValue,
            requestedBy
        } = req.body;

        // Validate required fields
        if (!salesOrder || !orderType || !netValue || !customer || !discountPercentage || !discountAmount || !finalValue || !requestedBy) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newDiscountRequest = new DiscountRequest({
            salesOrder,
            orderType,
            netValue,
            customer,
            discountPercentage,
            discountAmount,
            finalValue,
            requestedBy,
            status: 'PENDING_APPROVAL'
        });

        const savedRequest = await newDiscountRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        console.error("Error creating discount request:", err);
        if (err.code === 11000) { // MongoDB duplicate key error
            res.status(400).json({ error: "A discount request for this sales order already exists" });
        } else {
            res.status(400).json({ error: err.message || "Failed to create discount request" });
        }
    }
});

// Get all discount requests with optional status filter
app.get("/api/discount-requests", async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const requests = await DiscountRequest.find(filter)
            .sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json(requests);
    } catch (err) {
        console.error("Error fetching discount requests:", err);
        res.status(500).json({ error: err.message || "Failed to fetch discount requests" });
    }
});

// Get specific discount request
app.get("/api/discount-requests/:id", async (req, res) => {
    try {
        const request = await DiscountRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ error: "Discount request not found" });
        }
        res.status(200).json(request);
    } catch (err) {
        console.error("Error fetching discount request:", err);
        res.status(500).json({ error: err.message || "Failed to fetch discount request" });
    }
});

// Update discount request status
app.patch("/api/discount-requests/:id", async (req, res) => {
    try {
        const { status, approvedBy, rejectionReason } = req.body;
        
        if (!['PENDING_APPROVAL', 'APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const updateData = {
            status,
            approvedBy,
            approvalDate: new Date()
        };

        if (status === 'REJECTED' && rejectionReason) {
            updateData.rejectionReason = rejectionReason;
        }

        const updatedRequest = await DiscountRequest.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: "Discount request not found" });
        }

        res.status(200).json(updatedRequest);
    } catch (err) {
        console.error("Error updating discount request:", err);
        res.status(400).json({ error: err.message || "Failed to update discount request" });
    }
});

// Get requests by user
app.get("/api/discount-requests/user/:requestedBy", async (req, res) => {
    try {
        const requests = await DiscountRequest.find({ 
            requestedBy: req.params.requestedBy 
        }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (err) {
        console.error("Error fetching user's discount requests:", err);
        res.status(500).json({ error: err.message || "Failed to fetch user's discount requests" });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
});

//listening to the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;