import Link from "next/link";

export default function PersonalTab() {
  const BTN_CSS =
    "bg-[#303030] text-white px-4 text-center py-1 rounded-md shadow flex items-center justify-center h-10 min-w-[120px]";
  return (
    <div className="mt-28 text-lg flex justify-center">
      <Link href="/user/recommendations" className={BTN_CSS}>
        추천 콘텐츠 보기
      </Link>
    </div>
  );
}
