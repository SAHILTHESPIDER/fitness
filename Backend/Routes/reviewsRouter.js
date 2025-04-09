const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ReviewModel = require('../Models/reviewModel');

// GET: Fetch all reviews
router.get('/all', async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST: Add a new review
router.post('/add', async (req, res) => {
  const { Name, Ratings, Feedback } = req.body;

  if (!Name || !Ratings || !Feedback) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newReview = new ReviewModel({ Name, Ratings, Feedback });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
