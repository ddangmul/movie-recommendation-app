"use client";

import Image from "next/image";
import Rating from "../rating";
import { useState } from "react";
import Storage from "../storage";
import { TMDBContent } from "@/src/types/types";

type Props = {
  content: TMDBContent;
  overview: string;
  category: string;
};

export default function OverviewSection({
  content,
  overview,
  category,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="flex gap-4 items-start bg-[#f3f3f3] px-4 md:px-8 lg:px-60 py-8">
      <Image
        src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
        alt={`${content.title} 포스터 이미지`}
        width={200}
        height={300}
        className="flex-shrink-0"
      />
      <div className="w-full flex flex-col justify-between px-2 max-h-[300px] overflow-y-auto">
        <div className="flex flex-col items-end gap-6 py-2">
          <div>
            <Rating content={content} category={category} />
            <p className="text-xs text-right text-gray-600 mt-2">평가하기</p>
          </div>
          <Storage content={content} category={category} />
        </div>
        <div className="w-full flex flex-col text-sm text-gray-800 relative">
          <p
            className={`${
              isExpanded ? "" : "line-clamp-5"
            } transition-all duration-300`}
          >
            {overview || "줄거리 정보가 없습니다."}
          </p>
          {overview.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 text-xs text-right hover:text-gray-800 pr-2"
            >
              {isExpanded ? "접기" : "더보기"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
