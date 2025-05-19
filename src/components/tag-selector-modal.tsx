"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTags } from "../contexts/tag-context";
const AVAILABLE_TAGS = [
  "감성적",
  "긴장감",
  "잔잔한",
  "OST 좋음",
  "반전",
  "불안정한 심리",
  "웃긴",
  "로맨스",
  "폭력적",
];

export default function TagSelectorModal({
  isOpen,
  onClose,
  onSelectTags,
  initialTags = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectTags: (tags: string[]) => void;
  initialTags?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(initialTags);
  const { savedTags, setSavedTags, selectedTags, setSelectedTags } = useTags();

  const toggleTag = (tag: string) => {
    setSelected((prev: string[]) =>
      prev.includes(tag)
        ? prev.filter((t: string) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = () => {
    setSelectedTags(selected);
    onSelectTags(selected);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-semibold">
            태그 설정
          </Dialog.Title>
          <h3 className="font-semibold">추천 태그</h3>
          <div className="flex flex-wrap gap-2">
            {(savedTags.length > 0 ? savedTags : AVAILABLE_TAGS).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selected.includes(tag)
                    ? "bg-[#303030] text-white"
                    : "bg-[#f2f2f2] text-[#3c3c3c]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onClose}
              className="text-sm bg-[#f2f2f2] text-[#3c3c3c] shadow-sm px-4 py-1 rounded"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="bg-[#303030] text-white shadow-sm text-sm px-4 py-1 rounded"
            >
              적용
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
