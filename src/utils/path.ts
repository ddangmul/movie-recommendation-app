// utils/path.ts
export function isDetailPagePath(pathname: string): boolean {
  const path = pathname.split("?")[0]; // 쿼리 제거
  const segments = path.split("/").filter(Boolean); // 빈 문자열 제거

  // 정확히 /movie/12345 또는 /tv/67890 형식일 때만 true
  return (
    segments.length === 2 &&
    (segments[0] === "movie" || segments[0] === "tv") &&
    /^\d+$/.test(segments[1])
  );
}

export function extractCategoryFromPath(
  pathname: string
): "movie" | "tv" | undefined {
  const path = pathname.split("?")[0]; // 쿼리 제거
  const segments = path.split("/");

  if (segments[0] === "movie" || segments[0] === "tv") {
    return segments[0];
  }

  if (
    segments[0] === "discover" &&
    (segments[1] === "movie" || segments[1] === "tv")
  ) {
    return segments[1];
  }

  return undefined;
}
