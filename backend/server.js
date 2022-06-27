const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;
const app = express();

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//Routers
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);


//error handling
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(err.message)
    res.status(statusCode).json({
        message: err.message
    })
})

mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(PORT, () => { console.log(`Server is listening ${PORT}!`) })
    })
    .catch(err => {
        console.log(err)
    })
