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
}>({
  storage: [],
  addToStorage: () => {},
  deleteFromStorage: () => {},
  isInStorage: () => false,
});

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [storage, setStorage] = useState<StorageMap>([]);
  const { savedTags, setSavedTags } = useTags();

  useEffect(() => {
    const storedRatings = localStorage.getItem(STORAGE_KEY);
    if (storedRatings) {
      try {
        setStorage(JSON.parse(storedRatings));
      } catch (e) {
        console.log("로컬스토리지에서 컨텐츠 저장목록 가져오기 실패");
      }
    }
  }, []);

  const updateStorage = (updated: StorageMap) => {
    setStorage(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
      value={{ storage, addToStorage, deleteFromStorage, isInStorage }}
    >
      {children}
    </storageContext.Provider>
  );
}

export const useStorage = () => useContext(storageContext);
