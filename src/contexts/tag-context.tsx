"use client";

import { createContext, useContext, useState, useEffect } from "react";

type TagContextType = {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
};

const TagContext = createContext<TagContextType>({
  selectedTags: [],
  setSelectedTags: () => {},
});

export const TagProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("TAGS");
    if (saved) setSelectedTags(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("TAGS", JSON.stringify(selectedTags));
  }, [selectedTags]);

  return (
    <TagContext.Provider value={{ selectedTags, setSelectedTags }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTags = () => useContext(TagContext);
