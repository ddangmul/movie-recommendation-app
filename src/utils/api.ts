// src/utils/api.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.BASE_URL;

export const fetchPopularMovies = async (page: number = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    if (!res.ok) throw new Error("API 요청 실패");
    const data = await res.json();
    return data.results; // 영화 리스트만 추출
  } catch (err) {
    console.error("TMDB 호출 에러:", err);
    return [];
  }
};
