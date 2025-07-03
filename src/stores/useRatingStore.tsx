"use client";

import { create } from "zustand";
import { TMDBContent } from "../types/types";
import { saveGenres } from "../utils/helper";
import { useTagStore } from "./useTagStore";

type RatingState = {
  ratings: TMDBContent[];
  error: string | null;
  loadingRatings: () => void;
  setRating: (content: TMDBContent, category: string, rating: number) => void;
};

const RATING_KEY = "RATINGS";

export const useRatingStore = create<RatingState>((set, get) => ({
  ratings: [],
  error: null,

  loadingRatings: () => {
    try {
      const stored = localStorage.getItem(RATING_KEY);
      if (stored) {
        set({ ratings: JSON.parse(stored), error: null });
      }
    } catch {
      set({ error: "컨텐츠 평가 기록 가져오기 실패" });
    }
  },

  setRating: (content, category, rating) => {
    const { ratings } = get();
    const { savedTags, setSavedTags } = useTagStore.getState();
    const ratedContent = { ...content, category, rating };
    const filtered = ratings.filter((item) => item.id !== content.id);
    const updated = [...filtered, ratedContent];

    try {
      localStorage.setItem(RATING_KEY, JSON.stringify(updated));
      set({ ratings: updated, error: null });
    } catch {
      set({ error: "컨텐츠 평가 저장 실패" });
    }

    saveGenres(content, savedTags, setSavedTags);
  },
}));
