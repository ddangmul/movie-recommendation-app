import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type Props = {
  content: any;
  category: string;
} & React.HTMLAttributes<string>;

const ContentCard: React.FC<Props> = ({ content, category, className }) => {
  return (
    <Link href={`/${category}/${content.id}`} className="block">
      <div className="w-full">
        <div className="relative w-[220px] md:w-[200px] lg:w-[180px] aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
            alt={content.id}
            fill
            className="object-cover rounded-md"
            sizes="(min-width: 1024px) 220px, 100vw"
          />
        </div>
        <div className="text-left text-sm mt-2">
          <h3 className="overflow-hidden text-ellipsis">
            {content.title || content.name}
          </h3>
          <div className="flex gap-1 items-center">
            <Star className="w-5 text-yellow-300 fill-yellow-300" />
            {!content.rating && <p>평점 {content.vote_average}</p>}
            {content.rating && <p>내 평점 {content.rating}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
