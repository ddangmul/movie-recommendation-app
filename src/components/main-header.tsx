"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/MainLogo.png";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { isDetailPagePath } from "../utils/path";
import SearchBar from "./search-bar";

const MainHeader: React.FC = () => {
  const pathname = usePathname();
  const isDetailPage = isDetailPagePath(pathname);

  const textColorClass = isDetailPage ? "text-white" : "text-[#555555]";
  const iconColorClass = isDetailPage ? "text-white" : "text-gray-700";
  const bgColorClass = isDetailPage ? "bg-transparent" : "bg-white";

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    const base = `transition-colors duration-200 ${textColorClass}`;
    return isActive ? `${base} text-gray-400` : base;
  };

  return (
    <header
      className={`w-full shadow py-4 fixed top-0 left-0 z-50 ${bgColorClass}`}
    >
      <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-60">
        <div className="flex flex-start gap-4 md:gap-6 lg:gap-8 items-center">
          <Link href="/" className="logo" aria-label="로고">
            <Image
              src={Logo}
              alt="로고 이미지"
              width={40}
              style={{
                height: "auto",
                filter: isDetailPage ? "brightness(0) invert(1)" : "none",
              }}
            />
          </Link>
          <div className={`flex gap-1.5 md:gap-4 md:text-lg ${textColorClass}`}>
            <Link href="/" aria-label="home" className={getLinkClass("/")}>
              홈
            </Link>
            <Link
              href="/movie"
              aria-label="영화"
              className={getLinkClass("/movie")}
            >
              영화
            </Link>
            <Link
              href="/series"
              aria-label="시리즈"
              className={getLinkClass("/series")}
            >
              시리즈
            </Link>
          </div>
        </div>

        <div className="flex gap-2 lg:gap-3 items-center">
          <SearchBar className={iconColorClass} />
          <Link href="/user" aria-label="보관함">
            <ArchiveBoxIcon className={`w-8 h-8 ${iconColorClass}`} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
