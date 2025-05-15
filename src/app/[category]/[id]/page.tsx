import BackDropSection from "@/src/components/detail-content/backdrop";
import Credits from "@/src/components/detail-content/credits";
import OverviewSection from "@/src/components/detail-content/overview";
import SimilarContent from "@/src/components/detail-content/similar-content";
import Stills from "@/src/components/detail-content/stills";
import {
  fetchContentsById,
  fetchKoreanOverview,
  fetchCredits,
  fetchSimilarContents,
  fetchStills,
} from "@/src/utils/api";

type Props = {
  params: {
    category: string;
    id: string;
  };
};

export default async function DetailContentPage({ params }: Props) {
  const { category, id } = await params;

  const content = await fetchContentsById(category, id);
  const overview = await fetchKoreanOverview(category, id);
  const credits = await fetchCredits(category, id);
  const people = [...credits.directors, ...credits.cast];
  const similarContents = await fetchSimilarContents(category, id);
  const stills = await fetchStills(category, id);
  console.log(stills);
  return (
    <div>
      <BackDropSection content={content} />
      <OverviewSection content={content} overview={overview} />
      <div className="px-4 md:px-8 lg:px-60 mt-8 space-y-20  md:space-y-28">
        <Credits credits={people} />
        <Stills stills={stills} />
        <SimilarContent
          content={content}
          contents={similarContents}
          category={category}
        />
      </div>
    </div>
  );
}
