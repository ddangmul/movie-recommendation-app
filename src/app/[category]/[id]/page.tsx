import BackDropSection from "@/src/components/detail-content/backdrop";
import Credits from "@/src/components/detail-content/credits";
import OverviewSection from "@/src/components/detail-content/overview";
import {
  fetchContentsById,
  fetchKoreanOverview,
  fetchCredits,
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
  console.log(content);

  return (
    <div>
      <BackDropSection content={content} />
      <div className="px-4 md:px-8 lg:px-60 mt-8 space-y-20">
        <OverviewSection content={content} overview={overview} />
        <Credits credits={people} />
        <div>
          <h3 className="text-md font-semibold">리뷰</h3>
        </div>
        <div>
          <h3 className="text-md font-semibold">스틸</h3>
        </div>
        <div>
          <h3 className="text-md font-semibold">
            '{content.title}' 와 유사한 컨텐츠
          </h3>
        </div>
      </div>
    </div>
  );
}
