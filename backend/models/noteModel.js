const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket"
    },
    text: {
        type: String,
        required: true
    },
    isStaff: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true })


module.exports = mongoose.model("note", noteSchema);