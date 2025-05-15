import { extractCategoryFromPath } from "@/src/utils/path";
import ContentsSlider from "./contents-slider";
import { fetchTMDB } from "@/src/utils/api";

const ContentsSection = async (props: { topic: string; pathname: string }) => {
  const category = extractCategoryFromPath(props.pathname);
  const contents = await fetchTMDB(props.pathname);

  if (!category) {
    throw new Error("Invalid category in pathname");
  }

  return (
    <section className="space-y-2 mt-20">
      <h1 className="text-lg font-semibold">{props.topic}</h1>
      <ContentsSlider contents={contents} category={category} />
    </section>
  );
};

export default ContentsSection;
