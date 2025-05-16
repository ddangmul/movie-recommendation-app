"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ContentWithRating = {
  id: string;
  category: string;
  [key: string]: any;
  rating: number;
};

const RatingContext = createContext<{
  ratings: ContentWithRating[];
  setRating: (contentId: string, category: string, rating: number) => void;
}>({ ratings: [], setRating: () => {} });

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<ContentWithRating[]>([]);

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

  const setRating = (content: any, category: string, rating: number) => {
    setRatings((prev) => {
      const ratedContent: ContentWithRating = { ...content, category, rating };
      const filtered = prev.filter((item) => item.id !== content.id);
      const updatedRatings = [...filtered, ratedContent];
      localStorage.setItem("RATINGS", JSON.stringify(updatedRatings));
      return updatedRatings;
    });
  };

  return (
    <RatingContext.Provider value={{ ratings, setRating }}>
      {children}
    </RatingContext.Provider>
  );
}

export const useRating = () => useContext(RatingContext);
