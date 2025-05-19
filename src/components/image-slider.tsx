"use client";
import { useRef } from "react";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import Image from "next/image";
import { Still } from "../types/types";

const ImageSlider: React.FC<{
  stills: Still[];
}> = ({ stills }) => {
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
    <div className="relative w-full">
      <button
        onClick={scrollleft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white p-2 rounded-full shadow"
        aria-label="이전 스틸이미지 보기"
      >
        <LucideChevronLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white p-2 rounded-full shadow"
        aria-label="다음 스틸이미지 보기"
      >
        <LucideChevronRight />
      </button>

      <ul
        ref={listRef}
        className="flex overflow-x-hidden scroll-smooth gap-2 md:gap-4"
      >
        {!stills ? (
          <p>스틸 이미지가 없습니다.</p>
        ) : (
          stills.map((image: Still) => (
            <li key={image.file_path}>
              <div className="relative w-[300px] h-[200px]">
                <Image
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={`${image.id} 스틸 이미지`}
                  fill
                  className="object-cover rounded-md"
                  sizes="150px"
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ImageSlider;
