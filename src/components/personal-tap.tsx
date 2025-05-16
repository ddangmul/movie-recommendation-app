import Link from "next/link";

export default function PersonalTab() {
  const BTN_CSS =
    "bg-[#f3f3f3] text-[#202020] w-[150px] text-center py-1 rounded-md shadow";
  return (
    <div className="mt-28 text-lg px-4 md:px-6 lg:px-60 flex justify-center gap-8 mb-10">
      <Link href="/user/recommendations" className={BTN_CSS}>
        추천 콘텐츠
      </Link>
      <Link href="/user/analysis" className={BTN_CSS}>
        취향 분석
      </Link>
    </div>
  );
}
