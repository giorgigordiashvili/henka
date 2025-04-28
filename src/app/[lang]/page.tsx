import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Fruits from "@/components/Fruits";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reason from "@/components/Reason";
import Slider from "@/components/Slider";
import VitaminSection from "@/components/VitaminSection";
import VitaminTags from "@/components/VitaminTags";
import WhereToBuy from "@/components/WhereToBuy";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getCmsContent } from "@/lib/getCmsContent";

export default async function IndexPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;

  // Load dictionary translations
  const dictionary = await getDictionary(lang);

  // Load CMS content for the current locale
  const homeContent = await getCmsContent("home", lang);
  const navigationContent = await getCmsContent("navigation", lang);
  const footerContent = await getCmsContent("footer", lang);

  // Merge CMS content with dictionary content for components that support it
  const mergedDictionary = {
    ...dictionary,
    // Add CMS content where applicable
    menu: {
      ...dictionary.menu,
      ...navigationContent,
    },
    hero: {
      ...dictionary.hero,
      title: homeContent.heroTitle || dictionary.hero.title,
      subtitle: homeContent.heroDescription || dictionary.hero.subtitle,
      button: homeContent.heroButton?.text || dictionary.hero.button,
    },
    about: {
      ...dictionary.about,
      title: homeContent.about?.title || dictionary.about.title,
      subtitle: homeContent.about?.description || dictionary.about.subtitle,
    },
    whereToBuy: {
      ...dictionary.whereToBuy,
      title: homeContent.whereToBuy?.title || dictionary.whereToBuy.title,
    },
    footer: {
      ...dictionary.footer,
      copyright: footerContent.copyright || dictionary.footer.copyright,
    },
  };

  return (
    <div>
      <Header dictionary={mergedDictionary.menu} />
      <Hero dictionary={mergedDictionary.hero} />
      <AboutUs dictionary={mergedDictionary.about} />
      <Reason dictionary={mergedDictionary.reason} />
      <Marquee dictionary={mergedDictionary.marquee} />
      <VitaminSection dictionary={mergedDictionary.vitamin} />
      <VitaminTags dictionary={mergedDictionary.vitaminTags} />
      <Fruits dictionary={mergedDictionary.fruits} enableStickyEffect={true} />
      <Slider dictionary={mergedDictionary.slider} />
      <WhereToBuy dictionary={mergedDictionary.whereToBuy} />
      <Footer dictionary={mergedDictionary.footer} />
    </div>
  );
}
