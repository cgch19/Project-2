app.get('/', (req, res) => {
    res.render("loginSignup")
})

app.get("/contact/new", (req, res) => {
    res.render("new.ejs", {
        tabTitle: "Create Contact"
    })
})

app.get("/contacts", (req, res) => {
    res.render("index.ejs", {
        allContacts: contacts,
        tabTitle: "Contact List"
    });
});


app.get("/contact/:id", (req, res) => {
    const contactId = req.params.id;
    const contact = contacts[contactId];
    if (!contact) {
        res.status(404).send("Contact not found");
    } else {
        res.render("show.ejs", {
            contact: contact
        });
    }
})

app.post("/contacts", (req, res) => {
    const newContact = {
        name: req.body.name,
        img: req.body.img,
        phone: req.body.phone,
        address: req.body.address
    }
    contacts.push(newContact)
    res.redirect("/contacts")
})

//Sign up
app.post('/signup', (req, res) => {
    const { newEmail, newPassword } = req.body
    users.push({ email: newEmail, password: newPassword})
    res.send("Signup successful! You can now login.")
})

app.post("/login", (req, res) => {
    const { email, password } = req.body
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
        res.send("Login successful! Redirecting to dashboard")
    } else {
        res.send("Invalid email or password. Please try again")
    }
})



