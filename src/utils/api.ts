import { cache } from "react";
import { GENRE_MAP } from "./constants";
import { Person, TMDBContent } from "../types/types";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TMDB_BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
const NEXT_PUBLIC_TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// 공통 fetch 함수
async function fetchFromTMDB<T>(url: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (TMDB_BEARER_TOKEN) {
    headers["Authorization"] = `Bearer ${TMDB_BEARER_TOKEN}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
    ...options,
  });

  if (!res.ok) throw new Error(`TMDB fetch error: ${res.status}`);
  return res.json() as Promise<T>;
}

// 컨텐츠 필터링 로직
function filterValidContent(results: TMDBContent[]) {
  return results.filter(
    (item) =>
      (item.title || item.name) &&
      item.backdrop_path &&
      item.poster_path &&
      item.overview &&
      item.vote_average &&
      item.vote_average !== 0
  );
}

//전체 콘텐츠 목록 불러오기
export async function fetchTMDB(pathname: string) {
  const data = await fetchFromTMDB<{ results: TMDBContent[] }>(
    `${NEXT_PUBLIC_BASE_URL}/${pathname}`
  );
  return data.results.length > 0 ? filterValidContent(data.results) : null;
}

// id로 컨텐츠 상세정보 요청
export const fetchContentsById = cache(async (category: string, id: string) => {
  return await fetchFromTMDB<TMDBContent>(
    `${NEXT_PUBLIC_BASE_URL}/${category}/${id}?language=ko-KR`
  );
});

// 콘텐츠 한국어 설명(Overview)만 추출하기
export const fetchKoreanOverview = cache(
  async (category: string, id: string) => {
    const data = await fetchFromTMDB<{ overview: string }>(
      `${NEXT_PUBLIC_BASE_URL}/${category}/${id}?language=ko-KR`
    );
    return data.overview || null;
  }
);

// 출연진 및 감독 정보 불러오기
export const fetchCredits = cache(async (category: string, id: string) => {
  const [data, dataJob] = await Promise.all([
    fetchFromTMDB<any>(`${NEXT_PUBLIC_BASE_URL}/${category}/${id}/credits`),
    fetchFromTMDB<any>(
      `${NEXT_PUBLIC_BASE_URL}/${category}/${id}/credits?language=ko-KR`
    ),
  ]);

  return {
    cast: data.cast.slice(0, 5).map((person: Person, idx: number) => {
      const koreanPerson = dataJob.cast[idx];
      return {
        ...person,
        character: koreanPerson?.character || person.character,
      };
    }),
    directors: data.crew.filter((person: Person) => person.job === "Director"),
  };
});

// 유사한 콘텐츠 추천 목록 불러오기
export const fetchSimilarContents = async (category: string, id: string) => {
  const data = await fetchFromTMDB<{ results: TMDBContent[] }>(
    `${NEXT_PUBLIC_BASE_URL}/${category}/${id}/similar?language=ko-KR`
  );
  return data.results.length > 0 ? filterValidContent(data.results) : null;
};

// 콘텐츠의 스틸 이미지 불러오기
export const fetchStills = async (category: string, id: string) => {
  const data = await fetchFromTMDB<{ backdrops: any[] }>(
    `https://api.themoviedb.org/3/${category}/${id}/images`
  );
  return data.backdrops ? data.backdrops.slice(0, 10) : null;
};

// TMDB 통합 검색
export const searchMulti = cache(async (query: string) => {
  const data = await fetchFromTMDB<{ results: TMDBContent[] }>(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&language=ko-KR&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  return filterValidContent(data.results);
});

// 장르 태그 기반 콘텐츠 탐색
export const fetchContentsByTags = cache(
  async (genreNames: string[], category: string) => {
    const genreIds = genreNames
      .map((name) => GENRE_MAP[name])
      .filter((id): id is number => !!id);
    if (genreIds.length === 0) return [];

    const data = await fetchFromTMDB<{ results: TMDBContent[] }>(
      `https://api.themoviedb.org/3/discover/${category}?api_key=${NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&with_genres=${genreIds.join(
        ","
      )}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return data.results;
  }
);

// 복수 장르 기반 콘텐츠 추천 불러오기
export async function fetchRecommendationsByGenreIds(
  genres: string[],
  category: "movie" | "tv"
) {
  if (genres.length === 0) return [];

  let combinedResults: TMDBContent[] = [];

  for (const genreId of genres) {
    const url = `https://api.themoviedb.org/3/discover/${category}?api_key=${NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&language=ko-KR`;
    const data = await fetchFromTMDB<{ results: TMDBContent[] }>(url);
    combinedResults = combinedResults.concat(filterValidContent(data.results));
  }

  const uniqueResultsMap = new Map<number, TMDBContent>();
  combinedResults.forEach((item) =>
    uniqueResultsMap.set(Number(item.id), item)
  );

  return Array.from(uniqueResultsMap.values());
}
