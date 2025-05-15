"use client";

import { searchMulti } from "@/src/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ContentCard from "@/src/components/contents/content-card";
import Link from "next/link";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchSearchTerm = async () => {
      try {
        const result = await searchMulti(searchTerm);
        setSearchResult(result);
      } catch (error) {
        console.error("검색 실패", error);
        setSearchResult([]);
      }
    };

    fetchSearchTerm();
  }, [searchTerm]);

  const handleClick = (content: any) => {
    router.push(`/${content.media_type}/${content.id}`);
  };

  return (
    <div className="pt-28 px-4 md:px-6 lg:px-60 min-h-screen">
      <h2 className="text-lg px-2">'{searchTerm}' 검색 결과</h2>
      <section className="mt-4">
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-10">
          {searchResult.map((content: any) => (
            <li
              key={content.poster_path}
              className="mt-6 mx-0"
              onClick={() => handleClick(content)}
            >
              <ContentCard content={content} className="w-[360px] h-[540px]" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
