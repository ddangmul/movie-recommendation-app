import BackDropSection from "@/src/components/detail-content/backdrop";
import OverviewSection from "@/src/components/detail-content/overview";
import { fetchContentsById, fetchKoreanOverview } from "@/src/utils/api";

type Props = {
  params: {
    category: string;
    id: string;
  };
};

export default async function DetailContentPage({ params }: Props) {
  const { category, id } = await params;

  const content = await fetchContentsById(category, id);
  console.log(content);
  const overview = await fetchKoreanOverview(category, id);

  return (
    <div>
      <BackDropSection content={content} />
      <div className="px-4 md:px-8 lg:px-60 mt-8 space-y-10">
        <OverviewSection content={content} overview={overview} />
        <div>
          <h3 className="text-lg font-semibold">출연/제작</h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold">리뷰</h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold">스틸</h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            '{content.title}' 와 유사한 컨텐츠
          </h3>
        </div>
      </div>
    </div>
  );
}
