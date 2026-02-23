const express = require("express")
const router = express.Router()

const {cartCreate, cartGet} = require("../controllers/cartController")

router.post("/cart",cartCreate)
router.get("/cart",cartGet)

module.exports = router