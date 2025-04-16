import AboutUs from "@/components/AboutUs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reason from "@/components/Reason";
import VitaminSection from "@/components/VitaminSection";
import VitaminTags from "@/components/VitaminTags";
import { Locale } from "@/i18n-config";
import Slider from "@/components/Slider";
import WhereToBuy from "@/components/WhereToBuy";
import { getDictionary } from "@/get-dictionary";
import Footer from "@/components/Footer";
import Fruits from "@/components/Fruits";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
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
