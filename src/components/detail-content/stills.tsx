import ImageSlider from "../image-slider";

type Props = {
  stills: any;
};

export default function Stills({ stills }: Props) {
  return (
    <section>
      <h3 className="text-md mb-8 font-semibold">스틸</h3>
      <ImageSlider images={stills} />
    </section>
  );
}
