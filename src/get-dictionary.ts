import fs from 'fs'
import path from 'path'
import 'server-only'
import type { Locale } from './i18n-config.ts'

// Use file system to read dictionary files directly in server components
const dictionaries = {
  ge: () =>
    JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'public/dictionaries/ge.json'),
        'utf8'
      )
    ),
  en: () =>
    JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'public/dictionaries/en.json'),
        'utf8'
      )
    ),
  ru: () =>
    JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'public/dictionaries/ru.json'),
        'utf8'
      )
    )
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.ge()
