const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: { type: String, requierd: true },
    phone: { type: String, requierd: true },
    address: { type: String, requierd: true }
}, { timestamps: true })