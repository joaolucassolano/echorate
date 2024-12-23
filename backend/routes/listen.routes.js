const express = require('express');
const router = express.Router();
const listenController = require('../controllers/listen.controller');

router.post('/listen', listenController.toogleListen);
router.get('/listen/user/:id', listenController.findByUserId);


module.exports = router;