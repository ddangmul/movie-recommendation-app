import ContentsSlider from "./contents-slider";
import { BASE_URL } from "@/src/utils/constants";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

const ContentsList = async (props: { topic: string; pathname: string }) => {
  const res = await fetch(`${BASE_URL}/${props.pathname}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    },
  });

  const data = await res.json();
  const contents = data.results;
  console.log(data);
  return (
    <section className="space-y-2">
      <h1 className="text-lg font-semibold">{props.topic}</h1>
      <ContentsSlider contents={contents} />
    </section>
  );
};

export default ContentsList;
