"use client";

import { TMDBContent } from "../types/types";
import { createContext, useContext, useState, useEffect } from "react";
import { useTags } from "./tag-context";
import { saveGenres } from "../utils/helper";

type StorageMap = TMDBContent[];

const STORAGE_KEY = "STORAGE";

const storageContext = createContext<{
  storage: StorageMap;
  addToStorage: (content: TMDBContent, category: string) => void;
  deleteFromStorage: (content: TMDBContent) => void;
  isInStorage: (content: TMDBContent) => boolean;
  ratingError?: string | null;
}>({
  storage: [],
  addToStorage: () => {},
  deleteFromStorage: () => {},
  isInStorage: () => false,
  ratingError: null,
});

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [storage, setStorage] = useState<StorageMap>([]);
  const { savedTags, setSavedTags } = useTags();
  const [ratingError, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedRatings = localStorage.getItem(STORAGE_KEY);
    if (storedRatings) {
      try {
        setStorage(JSON.parse(storedRatings));
        setError(null);
      } catch (e) {
        setError("저장한 컨텐츠 목록 가져오기 실패");
      }
    }
  }, []);

  const updateStorage = (updated: StorageMap) => {
    try {
      setStorage(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setError(null);
    } catch (e) {
      setError("저장목록 갱신 실패");
    }
  };

  const addToStorage = (content: TMDBContent, category: string) => {
    if (!storage.some((item) => item.id === content.id)) {
      const newContent = { ...content, category };
      updateStorage([...storage, newContent]);
    }
    saveGenres(content, savedTags, setSavedTags);
  };

  const deleteFromStorage = (content: TMDBContent) => {
    updateStorage(storage.filter((cont) => cont.id !== content.id));
  };

  const isInStorage = (content: TMDBContent) => {
    return storage.some((item) => item.id === content.id);
  };

  return (
    <storageContext.Provider
      value={{
        storage,
        addToStorage,
        deleteFromStorage,
        isInStorage,
        ratingError,
      }}
    >
      {children}
    </storageContext.Provider>
  );
}

export const useStorage = () => useContext(storageContext);
