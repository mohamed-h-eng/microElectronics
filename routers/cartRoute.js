const express = require("express")
const router = express.Router()

const {addCartController, cartGet} = require("../controllers/cartController")

router.post("/cart",addCartController)
router.get("/cart",cartGet)

module.exports = router