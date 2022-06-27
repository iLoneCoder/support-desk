const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("enter all fields");
        }

        const check = await User.findOne({ email })
        if (check) {
            res.status(400);
            throw new Error("User already exists!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name,
                email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400);
            throw new Error("User wasn't created");
        }
    } catch (error) {
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.status(statusCode).json({
            message: error.message
        })
    }

}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({
                _id: user._id,
                email: email,
                token: generateToken(user._id)
            })
        } else {
            res.status(401);
            throw new Error("Wrong email or password")
        }
    } catch (error) {
        const statusCode = res.statusCode ? res.statusCode : 500;

        res.status(statusCode).json({
            message: error.message
        })
    }

}

exports.getMe = (req, res, next) => {
    res.json(req.user);
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}