const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

router.post('/review', reviewController.recordReview);
router.get('/review/user/:id', reviewController.findByUserId);

module.exports = router;