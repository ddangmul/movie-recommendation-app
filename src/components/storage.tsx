import { PlusIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { useStorageStore } from "../stores/useStorageStore";
import { TMDBContent } from "../types/types";

export default function Storage({
  content,
  category,
}: {
  content: TMDBContent;
  category: string;
}) {
  const addToStorage = useStorageStore((state) => state.addToStorage);
  const deleteFromStorage = useStorageStore((state) => state.deleteFromStorage);
  const storageError = useStorageStore((state) => state.storageError);
  // selector로 isInStorage 결과를 가져오게 해서 isSaved를 계산된 값이 아니라 상태로 추적하게 리팩터링
  const isSaved = useStorageStore((state) => state.isInStorage(content));

  return (
    <div className="mb-10 flex flex-col items-end">
      {storageError && <p>{storageError}</p>}
      {isSaved ? (
        <XIcon
          className="text-gray-500 cursor-pointer"
          onClick={() => isSaved && deleteFromStorage(content)}
        />
      ) : (
        <PlusIcon
          className="text-gray-600 cursor-pointer"
          onClick={() => !isSaved && addToStorage(content, category)}
        />
      )}
      <p className="text-xs text-right text-gray-600 mt-1">
        {isSaved ? "컨텐츠 보관함에서 삭제" : "컨텐츠 보관함에 추가"}
      </p>
    </div>
  );
}
