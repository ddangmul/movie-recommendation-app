"use client";

import { useEffect, useState } from "react";
import { fetchRecommendationsByGenreIds } from "../utils/api";
import ContentsSlider from "./contents/contents-slider";
import { TMDBContent } from "../types/types";

export default function PersonalizedRecommendations() {
  const [ratedContents, setRatedContents] = useState<TMDBContent[]>([]);
  const [recommendations, setRecommendations] = useState<TMDBContent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rated = localStorage.getItem("RATINGS");
    if (rated) setRatedContents(JSON.parse(rated));
  }, []);

  useEffect(() => {
    if (ratedContents.length === 0) return;

    const fetchData = async () => {
      try {
        const genres = getTopGenres(ratedContents).map((genre) =>
          String(genre)
        );
        if (genres.length === 0) {
          setRecommendations([]);
          return;
        }

        const data = await fetchRecommendationsByGenreIds(genres, "movie");
        if (data) {
          setRecommendations(data);
        } else {
          setRecommendations([]);
        }
        setError(null);
      } catch (e) {
        setError("맞춤 컨텐츠 가져오기 실패");
      }
    };

    fetchData();
  }, [ratedContents]);

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold">당신의 취향과 일치하는 작품</h1>
      {error && <p className="text-red-500">{error}</p>}
      {recommendations.length === 0 && (
        <p>아직 취향을 분석하지 못했습니다. 다양한 컨텐츠를 평가해보세요.</p>
      )}
      <ContentsSlider contents={recommendations} category="movie" />
    </div>
  );
}

function getTopGenres(contents: TMDBContent[], topN = 3): number[] {
  const genreCountMap: Record<number, number> = {};

  contents.forEach((content) => {
    content.genres?.forEach((genre) => {
      genreCountMap[Number(genre.id)] =
        (genreCountMap[Number(genre.id)] || 0) + 1;
    });
  });

  const sortedGenres = Object.entries(genreCountMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN)
    .map(([id]) => Number(id));

  return sortedGenres;
}
