const express = require('express')
const app = express()
const port = 3000
const methodOverride = require("method-override")

let contacts = []

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');





app.listen(port, () => {
    console.log("listening to port 3000")
})

