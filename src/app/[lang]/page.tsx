import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import dynamic from "next/dynamic";

// Statically import components that are critical for the initial view (above the fold)
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Reason from "@/components/Reason";

// Dynamically import components that can be loaded later
const Marquee = dynamic(() => import("@/components/Marquee"));
const VitaminSection = dynamic(() => import("@/components/VitaminSection"));
const VitaminTags = dynamic(() => import("@/components/VitaminTags"));
const Fruits = dynamic(() => import("@/components/Fruits"));
const Slider = dynamic(() => import("@/components/Slider"));
const WhereToBuy = dynamic(() => import("@/components/WhereToBuy"));
const Footer = dynamic(() => import("@/components/Footer"));

export default async function IndexPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Header dictionary={dictionary.menu} />
      <Hero dictionary={dictionary.hero} />
      <AboutUs dictionary={dictionary.about} />
      <Reason dictionary={dictionary.reason} />
      <Marquee dictionary={dictionary.marquee} />
      <VitaminSection dictionary={dictionary.vitamin} />
      <VitaminTags dictionary={dictionary.vitaminTags} />
      <Fruits dictionary={dictionary.fruits} enableStickyEffect={true} />
      <Slider dictionary={dictionary.slider} />
      <WhereToBuy dictionary={dictionary.whereToBuy} />
      <Footer dictionary={dictionary.footer} />
    </div>
  );
}
