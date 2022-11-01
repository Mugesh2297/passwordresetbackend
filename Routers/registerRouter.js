const express = require("express");
const register = require("../Modules/registerModule");
const router = express.Router();

router.post("/signup", register.signup);
router.post("/signin", register.signin);

module.exports= router;