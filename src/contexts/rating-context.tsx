"use client";

import { ContentWithRating } from "../types/types";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchKeywords } from "../utils/api";
import { useTags } from "./tag-context";

const RatingContext = createContext<{
  ratings: ContentWithRating[];
  setRating: (contentId: string, category: string, rating: number) => void;
}>({ ratings: [], setRating: () => {} });

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<ContentWithRating[]>([]);
  const { selectedTags, setSelectedTags } = useTags();

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

  const setRating = async (content: any, category: string, rating: number) => {
    await setRatings((prev) => {
      const ratedContent: ContentWithRating = { ...content, category, rating };
      const filtered = prev.filter((item) => item.id !== content.id);
      const updatedRatings = [...filtered, ratedContent];
      localStorage.setItem("RATINGS", JSON.stringify(updatedRatings));
      return updatedRatings;
    });

    try {
      // 맞춤태그용 장르 저장
      const genres = content.genres?.map((genre: any) => genre.name) || [];
      console.log(genres);
      if (genres.length) {
        setSelectedTags([...selectedTags, ...genres]);
      }
    } catch (err) {
      console.log("TMDB 키워드 태그 불러오기 실패", err);
    }
  };

  return (
    <RatingContext.Provider value={{ ratings, setRating }}>
      {children}
    </RatingContext.Provider>
  );
}

export const useRating = () => useContext(RatingContext);
