"use client";

import { useEffect, useState } from "react";
import { fetchContentsByTags } from "../utils/api";
import ContentCard from "./contents/content-card";

export default function TagResults({ tags }: { tags: string[] }) {
  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContentsByTags(tags, "movie");
      setContents(data);
    };

    if (tags.length) fetchData();
    console.log(contents);
  }, [tags]);

  return (
    <section className="top-24 flex w-full justify-center items-center ">
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {contents.map((content) => (
          <li key={content.id}>
            <ContentCard
              content={content}
              category="movie"
              className="w-[240px] h-[360px]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
