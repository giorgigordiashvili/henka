"use client";
import { getDictionary } from "@/get-dictionary";
import TextWithImage from "./ui/TextWithImage";

export default function VitaminSection({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["vitamin"];
}) {
  const listItems = [dictionary.list_one, dictionary.list_two, dictionary.list_three];

  return (
    <TextWithImage
      title={dictionary.title}
      subtitle={dictionary.description}
      imageSrc="/assets/vitamin.png"
      tabletImageSrc="/assets/vitamin-tablet.png"
      imagePosition="left"
      imageAlt="Vitamin"
      backgroundColor="#fcfcfc"
      listItems={listItems}
    />
  );
}
