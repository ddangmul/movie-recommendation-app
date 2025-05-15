import ContentsSection from "@/src/components/contents/contents-section";
import ContentsSlider from "@/src/components/contents/contents-slider";
import BackDropSection from "@/src/components/detail-content/backdrop";
import Credits from "@/src/components/detail-content/credits";
import OverviewSection from "@/src/components/detail-content/overview";
import {
  fetchContentsById,
  fetchKoreanOverview,
  fetchCredits,
  fetchSimilarContents,
} from "@/src/utils/api";
import { TMDB_BEARER_TOKEN } from "@/src/utils/constants";

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
  const similarContent = await fetchSimilarContents(category, id);
  console.log(content);
  return (
    <div>
      <BackDropSection content={content} />
      <div className="px-4 md:px-8 lg:px-60 mt-8 space-y-20">
        <OverviewSection content={content} overview={overview} />
        <Credits credits={people} />
        <div>
          <h3 className="text-md font-semibold">스틸</h3>
        </div>
        <div>
          <h3 className="text-md font-semibold">
            '{content.title || content.name}' 와 유사한 컨텐츠
          </h3>
          {similarContent.length >= 1 ? (
            <ContentsSlider contents={similarContent} category={category} />
          ) : (
            <p className="text-sm">유사한 컨텐츠 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export const fetchStills = async (category: string, id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${category}/${id}/images`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("스틸 이미지를 불러오기 실패");
  }

  const data = await res.json();
  return data.backdrops.slice(0, 10);
};
