import { pl } from "./translations/pl";
import { en } from "./translations/en";
import { uk } from "./translations/uk";
import type { Locale } from "./config";

export type { Translations } from "./types";

const dictionaries = { pl, en, uk } as const;

export function getTranslations(locale: Locale) {
  return dictionaries[locale] ?? pl;
}
