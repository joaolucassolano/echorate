const express = require('express');
const db = require('../config/database');
const router = express.Router();

router.get('/logout', async (req, res) => {
    req.cookies.accessToken = null;
});

module.exports = router;