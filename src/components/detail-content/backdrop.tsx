import { TMDBContent } from "@/src/types/types";
import Image from "next/image";

type Props = {
  content: TMDBContent;
};

export default function BackDropSection({ content }: Props) {
  const backdropUrl = content?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${content.backdrop_path}`
    : "/default-backdrop.jpg";

  return (
    <div className="relative h-[530px]">
      <Image
        src={backdropUrl}
        alt={content?.id ? `${content.id} 백드롭 이미지` : "백드롭 이미지"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/70 to-transparent " />
      <div className="absolute bottom-14 left-6 md:left-10 lg:left-60 text-white z-10 space-y-2">
        <h1 className="text-3xl font-bold">{content.title || content.name}</h1>
        <div className="mt-1 text-sm text-gray-200">
          <p>
            평점 {content.vote_average} |{" "}
            {content.release_date || content.first_air_date}
          </p>
          <p>
            {content.genres && `${content.genres[0].name} | `}
            {content.origin_country} | {content.runtime}분
          </p>
        </div>
      </div>
    </div>
  );
}
