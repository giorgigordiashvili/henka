import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await props.params

  const dictionary = await getDictionary(lang)

  return (
    <div>
      <Header dictionary={dictionary.menu} />
      <Hero dictionary={dictionary.hero} />
    </div>
  )
}
