import ImageSlider from "../image-slider";
import { Still } from "@/src/types/types";

type Props = {
  stills: Still[];
};

export default function Stills({ stills }: Props) {
  return (
    <section>
      <h3 className="text-md mb-8 font-semibold">스틸</h3>
      <ImageSlider stills={stills} />
    </section>
  );
}
