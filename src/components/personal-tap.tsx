import Link from "next/link";

export default function PersonalTab() {
  const BTN_CSS =
    "bg-[#303030] text-white px-4 text-center py-1 rounded-md shadow flex items-center justify-center h-10 min-w-[120px]";
  return (
    <div className="mt-32 text-lg flex gap-8 mb-[-80] md:mb-[-60] lg:mb-[-36]">
      <Link href="/user/recommendations" className={BTN_CSS}>
        추천 콘텐츠
      </Link>
      {/* <Link href="/user/analysis" className={BTN_CSS}>
        취향 분석
      </Link> */}
    </div>
  );
}
