import Image from "next/image";

type Props = {
  credits: any;
};

export default function Credits({ credits }: Props) {
  return (
    <section>
      <h3 className="text-md font-semibold mb-8">출연/제작</h3>
      <ul className="grid grid-cols-2 grid-rows-3 gap-4">
        {credits.map((person: any) => (
          <li key={person.id} className="flex gap-4">
            <div className="relative w-[70px] h-[100px]">
              <Image
                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                fill
                className="rounded"
                alt={`${person.name || person.original_name} 이미지`}
              />
            </div>
            <div className="pt-2">
              <p className="text-sm">{person.name || person.original_name}</p>
              <p className="text-xs">
                {person.job ? "감독" : "주연"}{" "}
                {person.character && <span> | {person.character}</span>}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
