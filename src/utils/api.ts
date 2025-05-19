import { cache } from "react";
import { BASE_URL, TMDB_BEARER_TOKEN, GENRE_MAP } from "./constants";
import { Person, TMDBContent } from "../types/types";

export async function fetchTMDB(pathname: string) {
  const res = await fetch(`${BASE_URL}/${pathname}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.status}`);
  }

  const data = await res.json();

  if (data.results.lengths <= 0) return null;

  const filteredResults = data.results.filter(
    (item: TMDBContent) =>
      (item.title || item.name) &&
      item.backdrop_path &&
      item.poster_path &&
      item.overview &&
      item.vote_average &&
      item.vote_average !== 0
  );

  return filteredResults;
}

export const fetchContentsById = cache(async (category: string, id: string) => {
  const res = await fetch(`${BASE_URL}/${category}/${id}?language=ko-KR`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.status}`);
  }

  const data = await res.json();

  if (!data) return null;

  return data;
});

export const fetchKoreanOverview = cache(
  async (category: string, id: string) => {
    const res = await fetch(`${BASE_URL}/${category}/${id}?language=ko-KR`, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`한국어 overview 정보 불러오기 실패`);
    }

    const data = await res.json();

    if (!data.overview) return null;

    return data.overview;
  }
);

export const fetchCredits = cache(async (category: string, id: string) => {
  const res = await fetch(`${BASE_URL}/${category}/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      accept: "application/json",
    },
  });

  const resJob = await fetch(
    `${BASE_URL}/${category}/${id}/credits?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok || !resJob.ok) {
    throw new Error(`크레딧 정보 불러오기 실패`);
  }

  const data = await res.json();
  const dataJob = await resJob.json();

  if (!data || !dataJob) return null;

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

export const fetchSimilarContents = async (category: string, id: string) => {
  const res = await fetch(
    `${BASE_URL}/${category}/${id}/similar?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("유사한 콘텐츠 불러오기 실패");
  }

  const data = await res.json();

  if (!data) return null;

  return data.results;
};

export const fetchStills = async (category: string, id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${category}/${id}/images`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("스틸 이미지 불러오기 실패");
  }

  const data = await res.json();

  if (!data.backdrops) return null;

  return data.backdrops.slice(0, 10);
};

export const searchMulti = cache(async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&language=ko-KR&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  const data = await res.json();

  if (!data) return null;

  const filteredResults = data.results.filter(
    (content: TMDBContent) =>
      (content.title || content.name) &&
      content.backdrop_path &&
      content.poster_path &&
      content.overview &&
      content.vote_average &&
      content.vote_average !== 0
  );

  return filteredResults;
});

// 영문. 한글번역 안됨
// export const fetchKeywords = async (id: string, category: string) => {
//   if (!id || !category) {
//     console.warn("Invalid id or category for fetchKeywords:", { id, category });
//     return [];
//   }
//   const res = await fetch(
//     `https://api.themoviedb.org/3/${category}/${id}/keywords?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`
//   );
//   const data = await res.json();
//   console.log(data);
//   return data.keywords?.map((k: any) => k.name) || [];
// };

export const fetchContentsByTags = cache(
  async (genreNames: string[], category: string) => {
    const genreIds = genreNames
      .map((name) => GENRE_MAP[name])
      .filter((id): id is number => !!id);

    if (genreIds.length === 0) return [];

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/${category}?api_key=${
        process.env.NEXT_PUBLIC_TMDB_API_KEY
      }&language=ko-KR&with_genres=${genreIds.join(",")}`
    );
    const data = await res.json();

    if (!data) return null;

    return data.results;
  }
);

export async function fetchRecommendationsByGenreIds(
  genreIds: number[],
  category: "movie" | "tv"
) {
  const url = `https://api.themoviedb.org/3/discover/${category}?api_key=${
    process.env.NEXT_PUBLIC_TMDB_API_KEY
  }&with_genres=${genreIds.join(",")}&language=ko-KR`;

  const res = await fetch(url);

  const data = await res.json();

  if (!data) return null;

  return data.results;
}
