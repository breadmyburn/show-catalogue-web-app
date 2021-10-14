const express = require("express");
const showModel = require("./models/show");
const showRouter = require("./routes/shows");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs"); // Set up views
app.use(express.static("public")); // Save static files (Images, CSS)
app.use(express.urlencoded({ extended: true })); // Method for recognizing incoming request objects as strings or arrays.
app.use(methodOverride("_method"));

// Environment Variables
require("dotenv").config();

// Connect to Database
const Show = require("./models/show")
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
try {
    // Connect to MongoDB cluster
    mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
     },
        () => console.log("Connected to Database")
    );
} catch (e) {
    console.log("Could not connect to Database");
}

// Index
app.get("/", async (req, res) => {
    const shows = await showModel.find().sort({ title: 'asc' });
    res.render("shows/index", { shows: shows });
})

// Connect Router
app.use("/shows", showRouter);

// Port 3000
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running."));