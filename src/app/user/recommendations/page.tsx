"use client";
import { useState } from "react";
import { useTagStore } from "@/src/stores/useTagStore";
import TagSelectorModal from "@/src/components/tag-selector-modal";
import TagResults from "@/src/components/tag-results";
import Link from "next/link";
import PersonalizedRecommendations from "@/src/components/personalized-contents";

const RecommendationsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"tv" | "movie">("movie");
  const selectedTags = useTagStore((state) => state.selectedTags);
  const setSelectedTags = useTagStore((state) => state.setSelectedTags);

  return (
    <div className="px-10 md:px-8 lg:px-0">
      <div className="flex flex-col md:gap-2 mb-8">
        <Link href="/user/recommendations" className="text-lg font-semibold">
          추천 콘텐츠
        </Link>
        <div className="flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#303030] text-white px-2 py-1 rounded"
          >
            태그 설정
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#f2f2f2] text-[#3c3c3c] rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-1 rounded-md ${
            mediaType === "movie"
              ? "bg-[#303030] text-white"
              : "bg-[#f2f2f2] text-[#3c3c3c]"
          }`}
          onClick={() => setMediaType("movie")}
        >
          영화
        </button>
        <button
          className={`px-4 py-1 rounded-md ${
            mediaType === "tv"
              ? "bg-[#303030] text-white"
              : "bg-[#f2f2f2] text-[#3c3c3c]"
          }`}
          onClick={() => setMediaType("tv")}
        >
          시리즈
        </button>
      </div>
      <div className="mt-10">
        {selectedTags.length <= 0 && <PersonalizedRecommendations />}
        <TagResults tags={selectedTags} category={mediaType} />
      </div>
      <TagSelectorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelectTags={(selected) => setSelectedTags(selected)}
        initialTags={[]}
      />
    </div>
  );
};

export default RecommendationsPage;
