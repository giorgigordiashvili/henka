import Header from '@/components/Header'
import MenuItem from '@/components/ui/MenuItem'
import NavigationLink from '@/components/ui/NavigationLink'
import Typography from '@/components/ui/Typography'
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '16px',
          alignItems: 'center'
        }}
      >
        <MenuItem text="გაიგე მეტი" href="/" size="M" />
        <MenuItem text="გაიგე მეტი" href="/" size="S" />
        <NavigationLink href="/" text="სად შევიძინო" />
        <Typography variant="h1">ტესტი</Typography>
        <Typography variant="h2">ტესტი</Typography>
        <Typography variant="lBodytext">ტესტი</Typography>
        <Typography variant="mBodytext">ტესტი</Typography>
        <Typography variant="sBodytext">ტესტი</Typography>
        <Typography variant="xsBodytext">ტესტი</Typography>
      </div>
    </div>
  )
}
