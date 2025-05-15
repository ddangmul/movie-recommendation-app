import { cache } from "react";
import { BASE_URL, TMDB_BEARER_TOKEN } from "./constants";

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

  const filteredResults = data.results.filter(
    (item: any) =>
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
  const res = await fetch(`${BASE_URL}/${category}/${id}`, {
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
      throw new Error(`Failed to fetch Korean overview`);
    }

    const data = await res.json();
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
    throw new Error(`Failed to fetch Korean overview`);
  }

  const data = await res.json();
  const dataJob = await resJob.json();

  return {
    cast: data.cast.slice(0, 5).map((person: any, idx: number) => {
      const koreanPerson = dataJob.cast[idx];
      return {
        ...person,
        character: koreanPerson?.character || person.character,
      };
    }),
    directors: data.crew.filter((person: any) => person.job === "Director"),
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
    throw new Error("스틸 이미지를 불러오기 실패");
  }

  const data = await res.json();
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
    const text = await res.text(); // HTML일 수도 있으므로 text로 읽기
    console.error("Error response:", text);
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  const data = await res.json();

  const filteredResults = data.results.filter(
    (item: any) =>
      (item.title || item.name) &&
      item.backdrop_path &&
      item.poster_path &&
      item.overview &&
      item.vote_average &&
      item.vote_average !== 0
  );

  return filteredResults;
});
