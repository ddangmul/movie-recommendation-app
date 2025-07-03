"use client";

import { create } from "zustand";
import { TMDBContent } from "../types/types";
import { saveGenres } from "../utils/helper";
import { useTagStore } from "./useTagStore";

type StorageState = {
  storage: TMDBContent[];
  ratingError: string | null;
  loadStorage: () => void;
  addToStorage: (content: TMDBContent, category: string) => void;
  deleteFromStorage: (content: TMDBContent) => void;
  isInStorage: (content: TMDBContent) => boolean;
};

const STORAGE_KEY = "STORAGE";

export const useStorageStore = create<StorageState>((set, get) => ({
  storage: [],
  ratingError: null,

  // 로컬스토리지에서 보관함 컨텐츠 불러오기
  loadStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ storage: JSON.parse(stored), ratingError: null });
      }
    } catch {
      set({ ratingError: "저장한 컨텐츠 목록 가져오기 실패" });
    }
  },

  // 보관함에 컨텐츠 추가하기
  addToStorage: (content, category) => {
    const { savedTags, setSavedTags } = useTagStore.getState();

    // 함수형 업데이트 방식 사용
    set((state) => {
      if (state.storage.some((item) => item.id === content.id)) {
        // 이미 저장된 경우 아무것도 안 함
        return {};
      }

      const newContent = { ...content, category };
      const updated = [...state.storage, newContent];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        return { ratingError: "저장목록 갱신 실패" };
      }

      saveGenres(content, savedTags, setSavedTags);
      return { storage: updated, ratingError: null };
    });
  },

  // 보관함에서 컨텐츠 제거
  deleteFromStorage: (content) => {
    set((state) => {
      const updated = state.storage.filter((item) => item.id !== content.id);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        return { ratingError: "저장목록 갱신 실패" };
      }

      return { storage: updated, ratingError: null };
    });
  },

  // 컨텐츠가 보관함에 있는지 확인
  isInStorage: (content) => {
    return get().storage.some((item) => item.id === content.id);
  },
}));
