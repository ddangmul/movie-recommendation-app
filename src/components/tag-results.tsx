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

  // media_type 없음 (보완 필요)
  // const filteredResults =
  //   category === "movie"
  //     ? contents.filter((content) => content.media_type === "movie")
  //     : contents.filter((content) => content.media_type === "tv");

  return (
    <section className="mt-10 flex w-full justify-center items-center ">
      {loading && <p className="text-gray-500">로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-8">
        {contents.map((content) => (
          <li key={content.id} className="flex justify-center">
            <ContentCard content={content} category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
