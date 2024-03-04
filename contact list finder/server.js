const express = require('express')
const app = express()
const port = 3000
const methodOverride = require("method-override")
require('./config/database');
require("dotenv").config()
const session = require('express-session')

const contactRoutes = require('./routes/contacts')
const userController = require("./controllers/userController")
const sessionsController = require("./controllers/sessions")



//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use("/contacts", contactRoutes);

app.use((req, res, next) => {
    console.log('Session:', req.session)
    next()
})



app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// app.set('view engine', 'ejs');

app.use('/contacts', contactRoutes)
app.use('/users', userController)
app.use('/sessions', sessionsController)

app.get("/", (req, res) => {
    res.redirect("/contacts")
})




app.listen(port, () => {
    console.log("listening to port 3000")
})

