const express = require("express");
const router = express.Router();
const userModule = require("../Modules/userModule");
const auth = require("../Modules/authModule");



router.get("/get",userModule.getUser)


router.get("/get/:id",userModule.getUserById)

router.put("/update/:id",userModule.updateUser);


router.post("/create",userModule.createUser);


router.delete("/delete/:id",userModule.deleteUser);


module.exports = router;