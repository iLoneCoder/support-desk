const express = require("express")
const route = express.Router({ mergeParams: true })

const { getNotes, createNote, deleteNote } = require("../controllers/noteController")

route.get("/", getNotes)
route.post("/", createNote)
route.delete("/", deleteNote)
module.exports = route