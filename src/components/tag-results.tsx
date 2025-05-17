"use client";

import { useEffect, useState } from "react";
import { fetchContentsByTags } from "../utils/api";
import ContentCard from "./contents/content-card";

export default function TagResults({
  tags,
  category,
}: {
  tags: string[];
  category: string;
}) {
  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContentsByTags(tags, category);
      setContents(data);
    };

    if (tags.length) fetchData();
    console.log(contents);
  }, [tags]);

  const filteredResults =
    category === "movie"
      ? contents.filter((content) => content.media_type === "movie")
      : contents.filter((content) => content.media_type === "tv");

  return (
    <section className="mt-10 flex w-full justify-center items-center ">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {contents.map((content) => (
          <li key={content.id} className="flex justify-center">
            <ContentCard content={content} category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
