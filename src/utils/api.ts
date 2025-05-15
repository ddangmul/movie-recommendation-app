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
  return data.results;
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
