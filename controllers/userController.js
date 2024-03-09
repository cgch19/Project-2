const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

//new user signup page
router.get("/new", (req, res) => {
    res.render("users/new.ejs", {currentUser: req.session.currentUser})
})

// creating a new user
router.post("/", async(req, res) => {
    try{
        // used this to make the password not visible
        //https://www.tabnine.com/code/javascript/functions/bcrypt/hashSync
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        const newUser = await User.create(req.body)
        res.redirect("/")
    }catch(err){
        console.log(err)
    }
})

module.exports = router
