import Image from "next/image";
import Link from "next/link";

const ContentCard: React.FC<{ content: any }> = ({ content }) => {
  return (
    <Link href="/" className="w-full flex-shrink-0 shadow-md">
      <div className="relative w-[200px] h-[300px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
          alt={content.title}
          fill
          className="object-cover rounded-md"
          sizes="150px"
        />
      </div>
      <h3 className="mt-2 text-sm">{content.title}</h3>
      <p>평점 {content.vote_average}</p>
    </Link>
  );
};

export default ContentCard;
