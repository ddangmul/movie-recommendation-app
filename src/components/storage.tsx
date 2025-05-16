import { PlusIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { useStorage } from "../contexts/storage-context";

export default function Storage({ contentId }: { contentId: string }) {
  const { addToStorage, deleteFromStorage, isInStorage } = useStorage();
  const isSaved = isInStorage(contentId);
  console.log(isSaved);

  return (
    <div className="mb-10 flex flex-col items-end">
      {isSaved ? (
        <XIcon
          className="text-gray-500 cursor-pointer"
          onClick={() => isSaved && deleteFromStorage(contentId)}
        />
      ) : (
        <PlusIcon
          className="text-gray-600 cursor-pointer"
          onClick={() => !isSaved && addToStorage(contentId)}
        />
      )}
      <p className="text-xs text-right text-gray-600 mt-1">
        {isSaved ? "컨텐츠 보관함에서 삭제" : "컨텐츠 보관함에 추가"}
      </p>
    </div>
  );
}
