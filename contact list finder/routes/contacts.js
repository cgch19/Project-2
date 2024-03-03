const router = require("express").Router()
const contactCtrl =  require("../controllers/contactController")

router.get('/', contactCtrl.index)
router.get('/new', contactCtrl.new)

module.exports = router