"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("에러:", error);
  }, [error]);

  return (
    <div className="p-4 text-red-500">
      <h2 className="text-lg font-bold">에러가 발생했습니다.</h2>
      <p>{error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => reset()}
      >
        다시 시도하기
      </button>
    </div>
  );
}
