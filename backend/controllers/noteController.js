const Notes = require("../models/noteModel")

exports.getNotes = async (req, res, next) => {
    const ticketId = req.params.id
    try {
        const notes = await Notes.find({ ticket: ticketId }).populate("user", "name");
        // console.log(notes)
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

exports.deleteNote = async (req, res, next) => {
    const userId = req.user._id
    const { noteId } = req.body

    try {
        if (!userId || !noteId) {
            res.status(400)
            throw new Error("Parameters not found!")
        }
        const note = await Notes.findOneAndDelete({ _id: noteId, user: userId })

        if (note) {
            res.status(200).json(note)
        } else {
            res.status(404)
            throw new Error("Note isn't found!")
        }
    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500

        res.status(statusCode).json({ message: error.message })
    }
}

exports.updateNote = async (req, res, next) => {
    const userId = req.user._id
    const { noteId, text } = req.body

    try {
        if (!userId || !noteId) {
            res.status(400)
            throw new Error("Parameters not found!")
        }

        const filter = {
            _id: noteId,
            user: userId
        }

        const update = {
            text
        }

        const note = await Notes.findOne(filter)


        if (!note || !text) {
            res.status(404)
            throw new Error("There is no element to update!")
        }

        const updatedNote = await Notes.findOneAndUpdate(filter, update, { new: true })

        res.status(200).json(updatedNote)

    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500

        res.status(statusCode).json({ message: error.message })
    }
} 