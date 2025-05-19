"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useRating } from "../contexts/rating-context";
import { TMDBContent } from "../types/types";

export default function Rating({
  content,
  category,
}: {
  content: TMDBContent;
  category: string;
}) {
  const [_hover, setHover] = useState(0);
  const { ratings, setRating } = useRating();

  const currentRating =
    ratings.find((cont) => cont.id === content.id)?.rating || 0;

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
          onClick={() => setRating(content, category, star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
