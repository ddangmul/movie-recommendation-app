"use client";

import { TMDBContent } from "../types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useTags } from "./tag-context";
import { saveGenres } from "../utils/helper";

const RatingContext = createContext<{
  ratings: TMDBContent[];
  setRating: (content: TMDBContent, category: string, rating: number) => void;
}>({ ratings: [], setRating: () => {} });

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<TMDBContent[]>([]);
  const { savedTags, setSavedTags } = useTags();

  useEffect(() => {
    const storedRatings = localStorage.getItem("RATINGS");
    if (storedRatings) {
      try {
        setRatings(JSON.parse(storedRatings));
      } catch (e) {
        console.log("로컬스토리지에서 평가기록 가져오기 실패");
      }
    }
  }, []);

  const setRating = (
    content: TMDBContent,
    category: string,
    rating: number
  ) => {
    setRatings((prev) => {
      const ratedContent: TMDBContent = { ...content, category, rating };
      const filtered = prev.filter((item) => item.id !== content.id);
      const updatedRatings = [...filtered, ratedContent];
      localStorage.setItem("RATINGS", JSON.stringify(updatedRatings));
      return updatedRatings;
    });

    saveGenres(content, savedTags, setSavedTags);
  };

  return (
    <RatingContext.Provider value={{ ratings, setRating }}>
      {children}
    </RatingContext.Provider>
  );
}

export const useRating = () => useContext(RatingContext);
