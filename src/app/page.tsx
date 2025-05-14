import ContentsList from "../components/contents/contents-list";

const HomePage = () => {
  return (
    <div>
      <ContentsList pathname="movie/popular" topic="현재 상영 중인 영화" />
    </div>
  );
};

export default HomePage;
