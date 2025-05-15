import Image from "next/image";
import Link from "next/link";

type Props = {
  content: any;
} & React.HTMLAttributes<string>;

const ContentCard: React.FC<Props> = ({ content, className }) => {
  return (
    <Link href={`/${content.category}/${content.id}`} className="flex-shrink-0">
      <div
        className={`relative mx-auto ${
          className
            ? `${className} md:w-[200px] md:h-[300px]`
            : "w-[200px] h-[300px]"
        }`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
          alt={content.id}
          fill
          className="object-cover rounded-md"
          sizes="150px"
        />
      </div>
      <div className="text-left text-sm mt-2 w-full px-4">
        <h3 className="overflow-hidden">{content.title}</h3>
        <p>평점 {content.vote_average}</p>
      </div>
    </Link>
  );
};

export default ContentCard;
