export const i18n = {
  defaultLocale: "ge",
  locales: ["ge", "en", "ru"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
