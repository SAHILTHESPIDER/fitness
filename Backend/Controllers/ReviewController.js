const Review = require("../Models/reviewModel");

exports.addReview = async (req, res) => {
  try {
    const { Name, Ratings, Feedback } = req.body;

    const newReview = new Review({ Name, Ratings, Feedback });
    await newReview.save();

    res.status(201).json({ message: "Review submitted successfully!" });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ error: "Server error while adding review." });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Fetch reviews error:", error);
    res.status(500).json({ error: "Server error while fetching reviews." });
  }
};
