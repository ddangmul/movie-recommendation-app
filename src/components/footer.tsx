import Link from "next/link";
import Image from "next/image";
import MainLogo from "@/src/assets/MainLogo.png";
import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#202020] text-[#dbdbdb] py-16 bottom-0 left-0 mt-40">
      <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-60 text-xs">
        <div className="flex flex-col gap-2">
          <p className="space-x-3">
            <Link href="/" aria-label="서비스 이용약관">
              서비스 이용약관
            </Link>
            <Link href="/" aria-label="개인정보 처리방침">
              개인정보 처리방침
            </Link>
          </p>
          <div>
            <p>주식회사 릴픽 | 대표 OOO | 서울특별시 종로구 </p>
            <p>사업자 등록 번호 000-00-00000</p>
          </div>
          <p className="flex gap-2">© REELPICK, Inc. All rights reserved.</p>
        </div>
        <div className="flex gap-2">
          <Instagram aria-label="인스타그램" />
          <Facebook aria-label="페이스북" />
          <Twitter aria-label="X (트위터)" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
