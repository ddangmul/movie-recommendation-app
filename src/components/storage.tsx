import { PlusIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { useStorage } from "../contexts/storage-context";
import { WishContent } from "../types/types";

export default function Storage({
  content,
  category,
}: {
  content: WishContent;
  category: string;
}) {
  const { addToStorage, deleteFromStorage, isInStorage } = useStorage();
  const isSaved = isInStorage(content);

  return (
    <div className="mb-10 flex flex-col items-end">
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
