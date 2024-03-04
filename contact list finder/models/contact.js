const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true},
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true })

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact