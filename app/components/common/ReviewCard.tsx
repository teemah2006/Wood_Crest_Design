"use client";

import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { reviewsProps } from "@/interfaces";

interface ReviewCardProps {
  review: reviewsProps;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={`${
          index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 p-4 bg-white">
      <CardContent className="flex flex-col gap-3">
        {/* Rating Stars */}
        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>

        {/* Body */}
        <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span className="font-medium">{review.name}</span>
          <span>{review.date}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
