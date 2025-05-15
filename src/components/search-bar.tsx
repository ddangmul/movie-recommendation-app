"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      {isOpen && (
        <input
          type="text"
          className="w-[150px] text-xs p-2 bg-[#f0f0f0]"
          placeholder="제목, 인물, 장르 검색"
        />
      )}
      <SearchIcon className="ml-1 h-5" onClick={() => setIsOpen((prev) => !prev)} />
    </div>
  );
};

export default SearchBar;
