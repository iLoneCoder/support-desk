const Notes = require("../models/noteModel")

exports.getNotes = async (req, res, next) => {
    const ticketId = req.params.id
    try {
        const notes = await Notes.find({ ticket: ticketId });

        res.status(200).json(notes)
    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500

        res.status(statusCode).json({ message: error.message })
    }
}

exports.createNote = async (req, res, next) => {
    const ticketId = req.params.id
    const userId = req.user._id
    const { text } = req.body

    try {
        if (!ticketId || !userId || !text) {
            res.status(400)
            throw new Error("Parametres are missing!")
        }

        const note = await Notes.create({
            user: userId,
            ticket: ticketId,
            text,
            isStaff: false
        })

        res.status(201).json(note)
    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500
        res.status(statusCode).json({ message: error.message })
    }
}