import ContentsSection from "../components/contents/contents-section";

const HomePage = () => {
  return (
    <div className="pt-20 px-4 md:px-6 lg:px-60">
      <ContentsSection pathname="movie/popular" topic="HOT 영화" />
      <ContentsSection
        pathname="discover/tv?sort_by=popularity.desc&with_origin_country=KR"
        topic="HOT 시리즈"
      />
      <ContentsSection
        pathname="discover/movie?with_genres=28&sort_by=popularity.desc"
        topic="TOP 액션 영화"
      />
    </div>
  );
};

export default HomePage;
