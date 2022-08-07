const express = require("express")
const route = express.Router({ mergeParams: true })

const { getNotes, createNote } = require("../controllers/noteController")

route.get("/", getNotes)
route.post("/", createNote)

module.exports = route