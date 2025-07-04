"use client";
import ContentsSlider from "@/src/components/contents/contents-slider";
import { useRatingStore } from "@/src/stores/useRatingStore";
import { useStorageStore } from "@/src/stores/useStorageStore";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

const UserPage: React.FC = () => {
  // 선택자 함수 사용
  const ratings = useRatingStore((state) => state.ratings);
  const error = useRatingStore((state) => state.error);
  const loadingRatings = useRatingStore((state) => state.loadingRatings);
  const storage = useStorageStore((state) => state.storage);
  const storageError = useStorageStore((state) => state.storageError);
  const loadStorage = useStorageStore((state) => state.loadStorage);

  useEffect(() => {
    loadingRatings();
    loadStorage();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg mt-4 mb-4">보관함</h1>

      {/* 평가한 컨텐츠 */}
      <section>
        <h2 className="text-lg font-semibold py-6">평가한 컨텐츠</h2>
        <div>
          {!error && ratings.length === 0 && (
            <p className="text-gray-500">아직 평가한 컨텐츠가 없어요.</p>
          )}
          {ratings.length > 0 && (
            <ContentsSlider contents={ratings} category="" />
          )}
        </div>
      </section>

      {/* 보고싶은 컨텐츠 */}
      <section className="mt-20">
        <h2 className="text-lg font-semibold py-6">보고싶은 컨텐츠</h2>
        <div>
          {storageError && <p className="text-red-500">{storageError}</p>}
          {!storageError && storage.length === 0 && (
            <p className="text-gray-500">보고싶은 컨텐츠가 비어 있어요.</p>
          )}
          {storage.length > 0 && (
            <ContentsSlider contents={storage} category="" />
          )}
        </div>
      </section>
    </div>
  );
};

export default UserPage;
