const express = require('express')
const app = express()
const port = 3000
const methodOverride = require("method-override")
require('./config/database');
require("dotenv").config()
// const session = require("express-session")

const contactRoutes = require('./routes/contacts')


//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use("/contacts", contactRoutes);


// app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.redirect("/contacts")
})




app.listen(port, () => {
    console.log("listening to port 3000")
})

