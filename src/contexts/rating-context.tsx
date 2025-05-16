"use client";

import { createContext, useContext, useEffect, useState } from "react";

type RatingMap = {
  [contentId: string]: number;
};

const RatingContext = createContext<{
  ratings: RatingMap;
  setRating: (contentId: string, rating: number) => void;
}>({ ratings: {}, setRating: () => {} });

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<RatingMap>({});

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

  const setRating = (contentId: string, rating: number) => {
    setRatings((prev) => {
      const updatedRatings = { ...prev, [contentId]: rating };
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
