"use client";
import { useState } from "react";
import TagSelectorModal from "@/src/components/tag-selector-modal";
import TagResults from "@/src/components/tag-results";

const RecommendationsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="px-14">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#cbdcd4] text-[#364842] px-4 py-2 rounded"
          >
            태그 설정
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#cbdcd4] text-[#364842] rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <TagResults tags={tags} />
      <TagSelectorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelectTags={(selected) => setTags(selected)}
      />
    </div>
  );
};

export default RecommendationsPage;
