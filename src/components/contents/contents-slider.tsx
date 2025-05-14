"use client";
import { useRef } from "react";
import ContentCard from "./content-card";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

const ContentsSlider: React.FC<{ contents: any }> = ({ contents }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollleft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[300px]">
      {/* 슬라이드 버튼 */}
      <button
        onClick={scrollleft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white p-2 rounded-full shadow"
        aria-label="이전 영화 보기"
      >
        <LucideChevronLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white p-2 rounded-full shadow"
        aria-label="다음 영화 보기"
      >
        <LucideChevronRight />
      </button>

      {/* 영화 리스트 */}
      <ul
        ref={listRef}
        className="flex overflow-x-hidden scroll-smooth gap-2 md:gap-4 h-[450px]"
      >
        {contents.map((content: any) => (
          <li key={content.id}>
            <ContentCard content={content} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentsSlider;
