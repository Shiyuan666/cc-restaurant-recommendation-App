const express = require('express');
const {signup, login, verify} = require('../handlers/auth');

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get('/', verify)

module.exports = router;