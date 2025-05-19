export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const TMDB_BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

if (!NEXT_PUBLIC_BASE_URL) {
  throw new Error("Missing BASE_URL in environment variables.");
}

if (!TMDB_BEARER_TOKEN) {
  throw new Error("Missing TMDB_BEARER_TOKEN in environment variables.");
}

export const GENRE_MAP: Record<string, number> = {
  액션: 28,
  모험: 12,
  애니메이션: 16,
  코미디: 35,
  범죄: 80,
  다큐멘터리: 99,
  드라마: 18,
  가족: 10751,
  판타지: 14,
  역사: 36,
  공포: 27,
  음악: 10402,
  미스터리: 9648,
  로맨스: 10749,
  SF: 878,
  TV영화: 10770,
  스릴러: 53,
  전쟁: 10752,
  서부: 37,
};
