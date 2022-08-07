const Ticket = require("../models/ticketModel");

const getTickets = async (req, res, next) => {
    const tickets = await Ticket.find({ user: req.user._id })
    res.status(200).json(tickets);
}

const getTicket = async (req, res, next) => {
    const id = req.params.id;

    try {
        const ticket = await Ticket.findById(id);
        
        if (!ticket) {
            res.status(404);
            throw new Error("Ticket not found!");
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("Not authorized!")
        }

        res.status(200).json(ticket);
    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode).json({ message: error.message })
    }

}

const createTicket = async (req, res, next) => {
    const { product, description } = req.body;
    try {
        if (!product || !description) {
            res.status(400);
            throw new Error("Enter product and description!")
        }

        const newTicket = await Ticket.create({
            user: req.user._id,
            product,
            description,
            status: "new"
        })

        res.status(201).json(newTicket);
    } catch (error) {
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.status(statusCode).json({ message: error.message });
    }

}

const updateTicket = async (req, res, next) => {
    const id = req.params.id;

    try {

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            res.status(404);
            throw new Error("Ticket Not found");
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("Not authorized!");
        }
        
        const updatedTicket = await Ticket.findOneAndUpdate({ _id: id }, req.body, { new: true })

        res.status(200).json(updatedTicket)
    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

const removeTicket = async (req, res, next) => {
    const id = req.params.id;

    try {
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            res.status(404);
            throw new Error("Ticket not found!")
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("Not authorized!")
        }

        await Ticket.findByIdAndRemove(id);
        res.status(200).json({ message: "Success!" })
    } catch (error) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode).json({ messge: error.message })
    }
}

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    updateTicket,
    removeTicket
}