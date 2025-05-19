import { Genre, TMDBContent } from "../types/types";

export function saveGenres(
  content: TMDBContent,
  savedTags: string[],
  setSavedTags: (tags: string[]) => void
) {
  try {
    // 맞춤태그용 장르 저장
    const genres = content.genres?.map((genre: Genre) => genre.name) || [];
    if (genres.length) {
      // 중복저장 방지 Set
      const mergedTags = Array.from(new Set([...savedTags, ...genres]));
      setSavedTags(mergedTags);
    }
  } catch (err) {
    console.log("TMDB 장르 태그 불러오기 실패", err);
  }
}
