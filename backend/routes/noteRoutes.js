const express = require("express")
const route = express.Router({ mergeParams: true })

const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController")

route.get("/", getNotes)
route.post("/", createNote)
route.delete("/", deleteNote)
route.put("/", updateNote)
module.exports = route