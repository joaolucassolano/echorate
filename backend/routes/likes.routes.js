const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');

router.post('/like', likeController.toogleLike);
router.get('/like/user/:id', likeController.findByUserId);
module.exports = router;