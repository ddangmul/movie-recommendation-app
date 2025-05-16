"use client";

import { createContext, useContext, useState, useEffect } from "react";

type StorageMap = string[];

const STORAGE_KEY = "STORAGE";

const storageContext = createContext<{
  storage: StorageMap;
  addToStorage: (contentId: string) => void;
  deleteFromStorage: (contentId: string) => void;
  isInStorage: (contentId: string) => boolean;
}>({
  storage: [],
  addToStorage: () => {},
  deleteFromStorage: () => {},
  isInStorage: () => false,
});

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [storage, setStorage] = useState<StorageMap>([]);

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

  const addToStorage = (contentId: string) => {
    if (!storage.includes(contentId)) {
      updateStorage([...storage, contentId]);
    }
  };

  const deleteFromStorage = (contentId: string) => {
    updateStorage(storage.filter((id) => id !== contentId));
  };

  const isInStorage = (contentId: string) => {
    return storage.includes(contentId);
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
