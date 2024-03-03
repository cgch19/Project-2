const Contact = require("../models/contact")


// app.get('/', (req, res) => {
//     res.render("loginSignup")
// })

const newForm = (req, res) => {
    try {
        res.render('new.ejs', 
        { tabTitle: 'New Contact', 
        currentUser: req.session.currentUser });
    } catch (err) {
        console.log(err);
    }
}

const create = async (req, res) => {
    try{
        req.body.isFriend = req.body.isFriend === 'on' ? true : false
        const newContact = await Contact.create(req.body)
        console.log(newContact)
    }catch(err){
        console.log(err)
    }
}

const index = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.render('index.ejs', { 
            allContacts: contacts, 
            tabTitle: 'Index', 
            // currentUser: req.session.User 
        })
    }catch(err) {
        console.log(err)
    };
};

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

// app.post("/contacts", (req, res) => {
//     const newContact = {
//         name: req.body.name,
//         img: req.body.img,
//         phone: req.body.phone,
//         address: req.body.address
//     }
//     contacts.push(newContact)
//     res.redirect("/contacts")
// })

// //Sign up
// app.post('/signup', (req, res) => {
//     const { newEmail, newPassword } = req.body
//     users.push({ email: newEmail, password: newPassword})
//     res.send("Signup successful! You can now login.")
// })

// app.post("/login", (req, res) => {
//     const { email, password } = req.body
//     const user = users.find(u => u.email === email && u.password === password)
//     if (user) {
//         res.send("Login successful! Redirecting to dashboard")
//     } else {
//         res.send("Invalid email or password. Please try again")
//     }
// })

module.exports = {
    create,
    index,
    show,
    new: newForm,
}