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
import { TMDBContent } from "@/src/types/types";
import { notFound } from "next/navigation";

type PageParams = Promise<{
  category: string;
  id: string;
}>;

export default async function DetailContentPage({
  params,
}: {
  params: PageParams;
}) {
  const { id, category } = await params;

  const content: TMDBContent = await fetchContentsById(category, id);
  const overview = await fetchKoreanOverview(category, id);
  const credits = await fetchCredits(category, id);
  const people = [...credits?.directors, ...credits?.cast];
  const similarContents = await fetchSimilarContents(category, id);
  const stills = await fetchStills(category, id);

  if (!content || !overview || !credits) {
    console.log(content, overview, credits, people, similarContents, stills);
    return notFound();
  }

  return (
    <div>
      <BackDropSection content={content} />
      <OverviewSection
        content={content}
        overview={overview}
        category={category}
      />
      <div className="px-4 md:px-8 lg:px-60 mt-8 space-y-20  md:space-y-28">
        <Credits credits={people} category={category} />
        {stills && <Stills stills={stills} />}
        {similarContents && (
          <SimilarContent
            content={content}
            contents={similarContents}
            category={category}
          />
        )}
      </div>
    </div>
  );
}
