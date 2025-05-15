import Image from "next/image";

type Props = {
  credits: any;
  category: string;
};

export default function Credits({ credits, category }: Props) {
  return (
    <section>
      <h3 className="text-md font-semibold mb-8">출연/제작</h3>
      <ul className="grid grid-cols-2 grid-rows-3 gap-4">
        {credits.map((person: any) => (
          <li key={person.id} className="flex gap-4">
            <div className="relative w-[70px] aspect-[2/3]">
              <Image
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : "/no-credits.png"
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70px"
                className="rounded"
                alt={`${person.name || person.original_name} 이미지`}
              />
            </div>
            <div className="pt-2">
              <p className="text-sm">{person.original_name || person.name}</p>
              <p className="text-xs">
                {category === "movie" && (
                  <>
                    {person.job ? "감독" : "주연"}
                    {person.character && <span> | {person.character}</span>}
                  </>
                )}
                {category === "tv" && (
                  <>
                    {person.job ?? person.job}
                    {person.character &&
                    (person.character === "진행자" ||
                      person.character === "Main Host") ? (
                      <span>진행자</span>
                    ) : (
                      <span>{person.character}</span>
                    )}
                  </>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
