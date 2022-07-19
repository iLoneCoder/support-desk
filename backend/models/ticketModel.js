const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "ongoing", "closed"],
        default: "new"
    },
    product: {
        type: String,
        required: true,
        enum: ["iPhone", "iPad", "iMac", "MacBook"]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("ticket", ticketSchema)