const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true},
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    // This is the website that helped with the creation schema
    //https://mongoosejs.com/docs/schematypes.html
    creation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact