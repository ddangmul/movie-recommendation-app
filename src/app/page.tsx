import ContentsSection from "../components/contents/contents-section";
import PersonalTab from "../components/personal-tap";
import PersonalizedRecommendations from "../components/personalized-contents";

const HomePage = () => {
  return (
    <div className="flex flex-col px-4 md:px-6 lg:px-60 gap-40 md:gap-32 lg:gap-24">
      <PersonalTab />
      <PersonalizedRecommendations />
      <ContentsSection
        pathname="movie/popular?language=ko-KR"
        topic="HOT 영화"
      />
      <ContentsSection
        pathname="discover/tv?language=ko-KR&with_original_language=ko&sort_by=popularity.desc"
        topic="HOT 시리즈"
      />
      <ContentsSection
        pathname="discover/movie?with_genres=28&sort_by=popularity.desc&language=ko-KR"
        topic="TOP 액션 영화"
      />
    </div>
  );
};

export default HomePage;
