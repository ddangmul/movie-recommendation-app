"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useRatingStore } from "../stores/useRatingStore";
import { TMDBContent } from "../types/types";

export default function Rating({
  content,
  category,
}: {
  content: TMDBContent;
  category: string;
}) {
  const [, setHover] = useState(0);
  const ratings = useRatingStore((state) => state.ratings);
  const setRating = useRatingStore((state) => state.setRating);
  const error = useRatingStore((state) => state.error);

  const currentRating =
    ratings.find((cont) => cont.id === content.id)?.rating || 0;

  return (
    <div className="flex gap-0.5 md:gap-1 lg:gap-0">
      {error && <p>{error}</p>}
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`cursor-pointer ${
            star <= currentRating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-400"
          } w-5 md:w-6 lg:w-7`}
          onClick={() => setRating(content, category, star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
