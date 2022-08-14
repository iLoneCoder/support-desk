const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;
    
    try {
        //get token
        try {
            token = req.headers.authorization.split(" ")[1];
        } catch {
            res.status(401);
            throw new Error("Token is undefined")
        }
        // console.log(token)
        if (token) {
            //decode token
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decode.id).select("-password");
            req.user = user;
        } else {
            res.status(401);
            throw new Error("Not veryfied");
        }
        next();
    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode).json({
            message: error.message
        })
    }
}

module.exports = protect;