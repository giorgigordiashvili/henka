import 'server-only'
import type { Locale } from './i18n-config.ts'

// Fetch dictionaries from public folder instead of importing them
const dictionaries = {
  ge: () =>
    fetch(`${process.env.NEXT_PUBLIC_URL || ''}/dictionaries/ge.json`).then(
      (res) => res.json()
    ),
  en: () =>
    fetch(`${process.env.NEXT_PUBLIC_URL || ''}/dictionaries/en.json`).then(
      (res) => res.json()
    ),
  ru: () =>
    fetch(`${process.env.NEXT_PUBLIC_URL || ''}/dictionaries/ru.json`).then(
      (res) => res.json()
    )
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.ge()
