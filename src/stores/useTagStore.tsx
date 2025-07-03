"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type TagState = {
  savedTags: string[];
  selectedTags: string[];
  setSavedTags: (tagg: string[]) => void;
  setSelectedTags: (tags: string[]) => void;
};

export const useTagStore = create<TagState>()(
  persist(
    (set) => ({
      savedTags: [],
      selectedTags: [],
      setSavedTags: (tags) => set({ savedTags: tags }),
      setSelectedTags: (tags) => set({ selectedTags: tags }),
    }),
    { name: "TAGS" }
  )
);
