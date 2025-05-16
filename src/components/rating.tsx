"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useRating } from "../contexts/rating-context";

export default function Rating({ contentId }: { contentId: string }) {
  const [_hover, setHover] = useState(0);
  const { ratings, setRating } = useRating();
  const currentRating = ratings[contentId] || 0;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={30}
          className={`cursor-pointer ${
            star <= currentRating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-400"
          }`}
          onClick={() => setRating(contentId, star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
