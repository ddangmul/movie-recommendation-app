export function saveGenres(
  content: any,
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void
) {
  try {
    // 맞춤태그용 장르 저장
    const genres = content.genres?.map((genre: any) => genre.name) || [];
    if (genres.length) {
      // 중복저장 방지 Set
      const mergedTags = Array.from(new Set([...selectedTags, ...genres]));
      setSelectedTags(mergedTags);
    }
  } catch (err) {
    console.log("TMDB 장르 태그 불러오기 실패", err);
  }
}
