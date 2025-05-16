"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar: React.FC<{
  className: string;
}> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchTerm}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        {isOpen && (
          <input
            type="text"
            className="w-[150px] text-xs p-2 bg-[#f0f0f0]"
            placeholder="제목, 인물, 장르 검색"
            value={searchTerm}
            onChange={handleChange}
          />
        )}
        <SearchIcon
          className={`ml-1 h-5 ${className}`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
