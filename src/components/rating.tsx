"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function Rating() {
  const [rating, setRating] = useState(0); // 0~5까지 별점 저장
  const [_hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={30}
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
