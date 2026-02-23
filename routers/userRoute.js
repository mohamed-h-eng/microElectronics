const express = require("express")
const router = express.Router()

const {userRegister, userLogin} = require("../controllers/userController")

router.post("/user",userRegister)
router.get("/user",userLogin)

module.exports = router