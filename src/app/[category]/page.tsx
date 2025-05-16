import ContentsSection from "@/src/components/contents/contents-section";

type Props = {
  params: {
    category: string;
    id: string;
  };
};

export default async function ContentTypePage({ params }: Props) {
  const { category } = await params;

  let content;

  if (category === "movie") {
    content = (
      <>
        <ContentsSection pathname="movie/popular?language=ko-KR" topic="HOT" />
        <ContentsSection
          pathname="discover/movie?with_original_language=ko&language=ko-KR&vote_average.gte=8&sort_by=popularity.desc"
          topic="한국영화 명작"
        />
        <ContentsSection
          pathname="discover/movie?with_watch_providers=8&language=ko-KR&watch_region=KR&sort_by=popularity.desc"
          topic="넷플릭스 인기 영화"
        />
        <ContentsSection
          pathname="discover/movie?with_genres=53,9648&language=ko-KR&region=KR&sort_by=popularity.desc&certification_country=KR&certification.lte=12"
          topic="심리/스릴러 영화"
        />
      </>
    );
  } else if (category === "series") {
    content = (
      <>
        <ContentsSection
          pathname="discover/tv?language=ko-KR&with_original_language=ko&sort_by=popularity.desc"
          topic="HOT 시리즈"
        />
        <ContentsSection
          pathname="discover/tv?language=ko-KR&with_original_language=ko&sort_by=vote_average.desc&vote_count.gte=50"
          topic="평점 높은 시리즈"
        />
        <ContentsSection
          pathname="discover/tv?language=ko-KR&with_original_language=ko&with_genres=9648"
          topic="미스테리 시리즈"
        />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-4 md:px-6 lg:px-60">{content}</div>
  );
}
