const router = require("express").Router()
const contactsCtrl =  require("../controllers/contactController")
const isAuthenticated = require("../controllers/isAuthenticated")

router.use(isAuthenticated)
router.get('/', contactsCtrl.index)
router.get('/new', contactsCtrl.new)
router.post('/', contactsCtrl.create)
router.get('/:id', contactsCtrl.show)
router.delete('/:id', contactsCtrl.destroy)
router.get('/:id/edit', contactsCtrl.edit)
router.put('/:id', contactsCtrl.update)

module.exports = router