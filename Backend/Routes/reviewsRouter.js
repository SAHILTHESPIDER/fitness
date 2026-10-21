const express = require("express");
const Review = require("../Models/reviewModel");
const User = require("../Models/User");
const { requireAuth } = require("../lib/auth");

const router = express.Router();

function present(review) {
  return {
    id: review._id,
    name: review.Name,
    rating: review.Ratings,
    feedback: review.Feedback,
    createdAt: review.createdAt,
  };
}

router.get("/all", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(24);
  return res.json({ success: true, reviews: reviews.map(present) });
});

router.post("/add", requireAuth, async (req, res) => {
  const rating = Number(req.body.rating ?? req.body.Ratings);
  const feedback = String(req.body.feedback ?? req.body.Feedback ?? "").trim();
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Pick a rating from 1 to 5." });
  }
  if (feedback.length < 3 || feedback.length > 500) {
    return res.status(400).json({ success: false, message: "Write a short review, between 3 and 500 characters." });
  }
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ success: false, message: "Please log in." });
  const review = await Review.create({
    Name: `${user.name} ${user.lastname}`.trim(),
    Ratings: rating,
    Feedback: feedback,
    user: user._id,
  });
  return res.status(201).json({ success: true, review: present(review) });
});

module.exports = router;
