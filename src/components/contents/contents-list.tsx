import ContentsSlider from "./contents-slider";
import { BASE_URL, TMDB_BEARER_TOKEN } from "@/src/utils/constants";

const ContentsList = async (props: { topic: string; pathname: string }) => {
  const category = props.pathname.split("/")[0];

  const res = await fetch(`${BASE_URL}/${props.pathname}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    },
  });

  const data = await res.json();
  let contents = data.results;
  return (
    <section className="space-y-2">
      <h1 className="text-lg font-semibold">{props.topic}</h1>
      <ContentsSlider contents={contents} category={category} />
    </section>
  );
};

export default ContentsList;
