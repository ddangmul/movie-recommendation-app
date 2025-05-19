"use client";

import { useEffect, useState } from "react";
import { fetchRecommendationsByGenreIds } from "../utils/api";
import ContentsSlider from "./contents/contents-slider";

type Content = {
  title: string;
  id: number;
  genres: { id: number; name: string }[];
};

export default function PersonalizedRecommendations() {
  const [ratedContents, setRatedContents] = useState<Content[]>([]);
  const [recommendations, setRecommendations] = useState([]);
  const [topGenres, setTopGenres] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rated = localStorage.getItem("RATINGS");
    if (rated) setRatedContents(JSON.parse(rated));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const genres = getTopGenres(ratedContents);
      setTopGenres(genres);
      const data = await fetchRecommendationsByGenreIds(topGenres, "movie");
      setRecommendations(data);

      try {
        if (ratedContents.length) fetchData();
        setError(null);
      } catch (e) {
        setError("맞춤 컨텐츠 가져오기 실패");
      }
    };
  }, [ratedContents]);

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold">
        높은 점수를 준 작품들과 유사한 컨텐츠
      </h1>
      {error && <p>{error}</p>}
      <ContentsSlider contents={recommendations} category="movie" />
    </div>
  );
}

function getTopGenres(contents: Content[], topN = 3): number[] {
  const genreCountMap: Record<number, number> = {};

  contents.forEach((content) => {
    content.genres.forEach((genre) => {
      genreCountMap[genre.id] = (genreCountMap[genre.id] || 0) + 1;
    });
  });

  const sortedGenres = Object.entries(genreCountMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN)
    .map(([id]) => Number(id));

  return sortedGenres;
}
