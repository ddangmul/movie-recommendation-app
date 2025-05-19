"use client";

import { TMDBContent } from "../types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useTags } from "./tag-context";
import { saveGenres } from "../utils/helper";

const RatingContext = createContext<{
  ratings: TMDBContent[];
  setRating: (content: TMDBContent, category: string, rating: number) => void;
  error?: string | null;
}>({ ratings: [], setRating: () => {}, error: null });

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<TMDBContent[]>([]);
  const { savedTags, setSavedTags } = useTags();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedRatings = localStorage.getItem("RATINGS");
    if (storedRatings) {
      try {
        setRatings(JSON.parse(storedRatings));
        setError(null);
      } catch (e) {
        setError("컨텐츠 평가 기록 가져오기 실패");
      }
    }
  }, []);

  const setRating = (
    content: TMDBContent,
    category: string,
    rating: number
  ) => {
    try {
      setRatings((prev) => {
        const ratedContent: TMDBContent = { ...content, category, rating };
        const filtered = prev.filter((item) => item.id !== content.id);
        const updatedRatings = [...filtered, ratedContent];
        localStorage.setItem("RATINGS", JSON.stringify(updatedRatings));
        return updatedRatings;
      });
      saveGenres(content, savedTags, setSavedTags);
      setError(null);
    } catch (e) {
      setError("컨텐츠 평가 저장 실패");
    }
  };

  return (
    <RatingContext.Provider value={{ ratings, setRating, error }}>
      {children}
    </RatingContext.Provider>
  );
}

export const useRating = () => useContext(RatingContext);
