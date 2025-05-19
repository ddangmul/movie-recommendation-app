import { TMDBContent } from "@/src/types/types";
import ContentsSlider from "../contents/contents-slider";

type Props = {
  content: TMDBContent;
  contents: TMDBContent[];
  category: string;
};

export default function SimilarContent({ content, contents, category }: Props) {
  return (
    <section>
      <h3 className="text-md font-semibold mb-8">
        '{content.title || content.name}' 와 유사한 컨텐츠
      </h3>
      {contents.length >= 1 ? (
        <ContentsSlider contents={contents} category={category} />
      ) : (
        <p className="text-sm">유사한 컨텐츠 정보가 없습니다.</p>
      )}
    </section>
  );
}
