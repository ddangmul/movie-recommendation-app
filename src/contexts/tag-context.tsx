"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type TagContextType = {
  savedTags: string[];
  setSavedTags: Dispatch<SetStateAction<string[]>>;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
};

const TagContext = createContext<TagContextType>({
  savedTags: [],
  setSavedTags: () => {},
  selectedTags: [],
  setSelectedTags: () => {},
});

export const TagProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedTags, setSavedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("TAGS");
    if (saved) setSavedTags(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("TAGS", JSON.stringify(savedTags));
  }, [savedTags]);

  return (
    <TagContext.Provider
      value={{ savedTags, setSavedTags, selectedTags, setSelectedTags }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTags = () => useContext(TagContext);
