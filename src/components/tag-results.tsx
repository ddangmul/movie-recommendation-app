"use client";

import { useEffect, useState } from "react";
import { fetchContentsByTags } from "../utils/api";
import ContentCard from "./contents/content-card";
import { TMDBContent } from "../types/types";

export default function TagResults({
  tags,
  category,
}: {
  tags: string[];
  category: string;
}) {
  const [contents, setContents] = useState<TMDBContent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [increment, setIncrement] = useState(3);

  // 브라우저 사이즈에 따라 증가량 설정
  useEffect(() => {
    const updateIncrement = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleCount(12);
        setIncrement(6);
      } else if (width >= 1024) {
        setVisibleCount(6);
        setIncrement(6);
      } else {
        setVisibleCount(5);
        setIncrement(5);
      }
    };

    updateIncrement(); // 초기 설정
    window.addEventListener("resize", updateIncrement); // 리사이즈 대응
    return () => window.removeEventListener("resize", updateIncrement);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchContentsByTags(tags, category);
        setContents(data);
        setError(null);
      } catch (err) {
        setError("태그에 해당하는 콘텐츠 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    if (tags.length) fetchData();
  }, [tags, category]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  const visibleRecommendations: TMDBContent[] = contents.slice(0, visibleCount);

  // media_type 없음 (보완 필요)
  // const filteredResults =
  //   category === "movie"
  //     ? contents.filter((content) => content.media_type === "movie")
  //     : contents.filter((content) => content.media_type === "tv");

  return (
    <section className="mt-10 flex flex-col gap-8 w-full justify-center items-center">
      {loading && <p className="text-gray-500">로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-8 lg:gap-6">
        {visibleRecommendations.length > 0 &&
          visibleRecommendations.map((content: TMDBContent) => (
            <li key={content.id} className="flex justify-center">
              <ContentCard content={content} category={category} />
            </li>
          ))}
      </ul>
      {contents.length > visibleRecommendations.length && (
        <button
          className="mt-2 px-4 py-2 text-sm bg-[#303030] text-white rounded"
          onClick={handleShowMore}
        >
          더보기
        </button>
      )}
    </section>
  );
}
