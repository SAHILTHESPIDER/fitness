import React, { useState, useEffect } from "react";
import reviewer1 from "../assets/reviewer-1.jpg";
import reviewer2 from "../assets/reviewer-2.jpg";
import reviewer3 from "../assets/reviewer-3.jpg";
import reviewer4 from "../assets/reviewer-4.jpg";
import TestimonialCard from "./TestimonialCard";
import axios from "axios";

export const Reviews = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showInput, setShowInput] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Fetch reviews on component load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/reviews/all");
        const formatted = response.data.map((review) => ({
          ...review,
          Ratings: "⭐".repeat(review.Ratings),
          img: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
        }));
        setTestimonials(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async () => {
    if (!name || !reviewText) {
      alert("Please enter your name and review.");
      return;
    }

    const newReview = {
      Name: name,
      Ratings: "⭐".repeat(rating),
      Feedback: reviewText,
      img: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
    };

    try {
      await axios.post("http://localhost:8080/api/reviews/add", {
        Name: name,
        Ratings: rating,
        Feedback: reviewText,
      });

      setTestimonials([...testimonials, newReview]);
      setShowInput(false);
      setReviewText("");
      setName("");
      setRating(5);
      setReviewSubmitted(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="w-screen my-11 px-4">
      {/* Header and Review Button */}
      <div className="flex justify-between md:px-10">
        <div className="title">
          <h6>Reviews </h6>
          <h1 className="md:text-4xl text-2xl font-bold">FROM YOU </h1>
        </div>
        <div>
          {!reviewSubmitted && (
            <button
              className="px-3 py-2 bg-custom-black text-white rounded-xl"
              onClick={() => setShowInput(!showInput)}
            >
              {showInput ? "Cancel" : "+Give Reviews"}
            </button>
          )}
        </div>
      </div>

      {/* Review Input Form */}
      {showInput && !reviewSubmitted && (
        <div className="bg-gray-100 p-4 rounded-lg my-4 w-80 mx-auto shadow-md">
          <input
            type="text"
            placeholder="Your name"
            className="border rounded-md px-3 py-1 w-full mb-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="border rounded-md px-3 py-1 w-full mb-2 text-sm"
            placeholder="Write a short review..."
            value={reviewText}
            rows="2"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>

          {/* Star Rating Buttons */}
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`px-2 py-1 text-xl ${
                  rating >= num ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setRating(num)}
              >
                ★
              </button>
            ))}
          </div>

          <button
            className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Review Section */}
      <div className="flex my-6">
        {/* Profile Images */}
        <div className="md:w-1/3 md:flex gap-x-6 gap-y-2 pl-7 md:flex-wrap hidden">
          <img className="w-20 h-20 rounded-full object-cover" src={reviewer1} alt="Reviewer-1" />
          <img className="w-16 h-16 rounded-full object-cover" src={reviewer2} alt="Reviewer-2" />
          <img className="w-24 h-24 rounded-full object-cover" src={reviewer3} alt="Reviewer-3" />
          <img className="w-20 h-20 rounded-full object-cover" src={reviewer4} alt="Reviewer-4" />
        </div>

        {/* Review Cards */}
        <div className="md:w-3/4 w-full md:p-5">
          {loading ? (
            <p className="text-center text-gray-500">Loading reviews...</p>
          ) : (
            <TestimonialCard testimonials={testimonials} />
          )}
        </div>
      </div>
    </div>
  );
};
