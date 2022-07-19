const express = require("express");
const route = express.Router();
const protect = require("../middlewares/protect");
const { getTickets, createTicket, getTicket, updateTicket, removeTicket } = require("../controllers/ticketController");

route.get("/", protect, getTickets)
route.post("/", protect, createTicket)
route.get("/:id", protect, getTicket)
route.put("/:id", protect, updateTicket)
route.delete("/:id", protect, removeTicket)

module.exports = route;