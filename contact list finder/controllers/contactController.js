const Contact = require("../models/contact")
const isAuthenticated = require("../controllers/isAuthenticated")


//NEW
const newForm = (req, res) => {
    try {
        res.render('new.ejs', 
        { tabTitle: 'New Contact', 
        currentUser: req.session.currentUser 
        });
    } catch (err) {
        console.log(err);
    }
}

//CREATE
const create = async (req, res) => {
    try{
        req.body.isFriend = req.body.isFriend === 'on' ? true : false
        const newContact = await Contact.create(req.body)
        console.log(newContact)
        res.redirect('/contacts')
    }catch(err){
        console.log(err)
    }
}

//INDEX
const index = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.render('index.ejs', { 
            allContacts: contacts, 
            tabTitle: 'Index', 
            currentUser: req.session.User 
        })
    }catch(err) {
        console.log(err)
    };
};

//SHOW
const show = async (req, res) => {
    try {
       console.log(req.params.id);
       const contactId = req.params.id;
       const contact = await Contact.findById(contactId);
       console.log(contact);
       res.render('show.ejs', {
          contact,
          tabTitle: contact.name, 
          currentUser: req.session.currentUser
       });
    } catch (err) {
       console.log(err);
       res.status(500).send("Internal Server Error");
    }
 };

 //DELETE
const destroy = async (req, res) => {
    try{
        console.log("inside destroy route")
        await Contact.findByIdAndDelete(req.params.id)
        res.redirect('/contacts')
    }catch(err){
        console.log(err)
    }
}

//EDIT
const editForm = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        res.render("edit.ejs", {
            contact,
            tabTitle: 'Edit Contact',
            curentUser: req.session.currentUser
        })
    }catch(err) {
        console.log(err)
    }
}

//UPDATE
const update = async (req, res) => {
    try{
        console.log(req.body)
        req.body.contactUpdated = req.body.contactUpdated === 'on' ? true : false
        console.log(req.body)
        const index = req.params.id
        const contact = await Contact.findByIdAndUpdate(index, req.body, { new: true })
        res.redirect('/contacts')
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    new: newForm,
    create,
    index,
    show,
    destroy,
    edit: editForm,
    update
}
