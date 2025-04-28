"use client";
import { getDictionary } from "@/get-dictionary";
import TextWithImage from "./ui/TextWithImage";

export default function AboutUs({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["about"];
}) {
  return (
    <TextWithImage
      withAsterisks
      id="aboutUs"
      title={dictionary.title}
      subtitle={dictionary.subtitle}
      imageSrc="/assets/about-us.png"
      imageAlt="About Us"
      backgroundColor="#fcfcfc"
    />
  );
}
