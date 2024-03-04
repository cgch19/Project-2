const isAuthenticated = (req, res, next) => {
    if(req.session && req.session.currentUser){
        return next()
    } else {
        res.redirect("/sessions/new")
    }
}

module.exports = isAuthenticated