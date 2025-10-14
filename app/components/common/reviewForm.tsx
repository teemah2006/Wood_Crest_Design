"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { reviewsProps } from "@/interfaces";
import { toast } from "react-toastify";
interface ReviewFormProps {
  onSubmit: (review: reviewsProps) => void;
  reviews?: boolean
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, reviews }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.body || !formData.name || rating === 0) {
      toast.info("Please fill all fields and select a rating.");
      return;
    }

    const newReview: reviewsProps = {
      title: formData.title,
      body: formData.body,
      name: formData.name,
      rating,
      date: new Date().toLocaleDateString(),
    };

    onSubmit(newReview);

    toast.success('Thank you for your review!❤️')

    // Reset form
    setFormData({ title: "", body: "", name: "" });
    setRating(0);
  };

  return (
    <Card className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-white">
      <CardContent>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {reviews? 'Leave a review': 'Be the first to review'}
        </h3>
        <p className="text-gray-600 mb-6 text-sm">
          Share your thoughts about this product. Your feedback helps others make informed choices.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Rating */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Your Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  size={22}
                  className={`cursor-pointer transition-all ${
                    (hoverRating ?? rating) >= num
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setRating(num)}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Title</label>
            <Input
              name="title"
              placeholder="Give your review a title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Your Review</label>
            <Textarea
              name="body"
              placeholder="Write your thoughts here..."
              value={formData.body}
              onChange={handleChange}
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Your Name</label>
            <Input
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-4 bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]"
          >
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
