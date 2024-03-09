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
        const newContact = await Contact.create({...req.body, creation:req.session.currentUser._id})
        console.log(newContact),
        res.redirect('/contacts')
    }catch(err){
        console.log(err)
    }
}

//INDEX
const index = async (req, res) => {
    try {
        const contacts = await Contact.find({creation:req.session.currentUser._id})
        res.render('index.ejs', { 
            allContacts: contacts, 
            tabTitle: 'Index', 
            currentUser: req.session.currentUser,
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
    }
 };

 //DELETE
const destroy = async (req, res) => {
    try{
        console.log("inside destroy route")
        await Contact.findByIdAndDelete({ _id:req.params.id,  creation:req.session.currentUser._id})
        res.redirect('/contacts')
    }catch(err){
        console.log(err)
    }
}

//EDIT
const editForm = async (req, res) => {
    try {
        const contact = await Contact.findById({_id:req.params.id, creation:req.session.currentUser._id})
        res.render("edit.ejs", {
            contact,
            tabTitle: 'Edit Contact',
            currentUser: req.session.currentUser
        })
    }catch(err) {
        console.log(err)
    }
}

// UPDATE
const update = async (req, res) => {
    try{
        req.body.contactUpdated = req.body.contactUpdated === 'on' ? true : false
        const index = req.params.id
        const contact = await Contact.findByIdAndUpdate( {_id:req.params.id, creation: req.session.currentUser._id },req.body,{ new: true })
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
