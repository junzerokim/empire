import "server-only";

const dictionaries = {
  en: () =>
    import("./dictionaries/en.json").then((mod) => mod.default),
  ko: () =>
    import("./dictionaries/ko.json").then((mod) => mod.default),
  cz: () =>
    import("./dictionaries/cz.json").then((mod) => mod.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
