import Image from "next/image";
import { PlusIcon } from "lucide-react";
import Rating from "../rating";

type Props = {
  content: any;
  overview: string;
};

export default function OverviewSection({ content, overview }: Props) {
  return (
    <section className="flex gap-4 items-start">
      <Image
        src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
        alt={`${content.title} 포스터 이미지`}
        width={200}
        height={300}
        className="flex-shrink-0"
      />
      <div className="w-full flex flex-col justify-between px-2 max-h-[300px] overflow-y-auto">
        <div className="flex flex-col items-end gap-2 py-2">
          <div>
            <Rating />
            <p className="text-xs text-right text-gray-600">평가하기</p>
          </div>
          <PlusIcon className="mb-4" />
        </div>
        <div className="text-sm overflow-y-auto">{overview}</div>
      </div>
    </section>
  );
}
