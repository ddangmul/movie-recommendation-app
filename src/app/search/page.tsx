"use client";

import { searchMulti } from "@/src/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ContentCard from "@/src/components/contents/content-card";
import { TMDBContent } from "@/src/types/types";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [searchResult, setSearchResult] = useState([]);
  const [mediaType, setMediaType] = useState<"all" | "movie" | "tv">("all");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchSearchTerm = async () => {
      try {
        const result = await searchMulti(searchTerm);
        setSearchResult(result);
        setHasError(false);
      } catch (e) {
        console.log(e);
        setSearchResult([]);
        setHasError(true);
      }
    };

    fetchSearchTerm();
  }, [searchTerm]);

  const filteredResults =
    mediaType === "all"
      ? searchResult
      : searchResult.filter(
          (content: TMDBContent) => content.media_type === mediaType
        );

  const handleClick = (content: TMDBContent) => {
    router.push(`/${content.media_type}/${content.id}`);
  };

  return (
    <div className="pt-24 px-4 md:px-6 lg:px-60 min-h-screen">
      <h2 className="text-lg px-2 my-4">'{searchTerm}' 검색 결과</h2>
      {hasError && (
        <p className="text-red-500 text-sm mt-4">
          검색 중 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
      )}

      <div className="px-2 flex gap-4 mb-4">
        <button
          className={`px-4 py-1 rounded-md ${
            mediaType === "all"
              ? "bg-[#303030] text-white"
              : "bg-[#f2f2f2] text-[#3c3c3c]"
          }`}
          onClick={() => setMediaType("all")}
        >
          전체
        </button>
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
      <section className="mt-4">
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-10">
          {filteredResults.map((content: TMDBContent) => (
            <li
              key={content.poster_path}
              className="mt-6 mx-0"
              onClick={() => handleClick(content)}
            >
              <ContentCard content={content} category={content.media_type} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
