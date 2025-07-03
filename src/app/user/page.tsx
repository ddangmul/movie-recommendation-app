"use client";
import ContentsSlider from "@/src/components/contents/contents-slider";
import { useRatingStore } from "@/src/stores/useRatingStore";
import { useStorageStore } from "@/src/stores/useStorageStore";
import { useEffect } from "react";

const UserPage: React.FC = () => {
  const { ratings, error, loadingRatings } = useRatingStore();
  const { storage, ratingError, loadStorage } = useStorageStore();

  useEffect(() => {
    loadingRatings();
    loadStorage();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg mt-4 mb-4">보관함</h1>
      <section>
        <h2 className="text-lg font-semibold py-6">평가한 컨텐츠</h2>
        <div>
          {error && <p>{error}</p>}
          <ContentsSlider contents={ratings} category="" />
        </div>
      </section>
      <section className="mt-20">
        <h2 className="text-lg font-semibold py-6">보고싶은 컨텐츠</h2>
        <div>
          {ratingError && <p>{ratingError}</p>}
          <ContentsSlider contents={storage} category="" />
        </div>
      </section>
    </div>
  );
};

export default UserPage;
