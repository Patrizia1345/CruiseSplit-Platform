import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en", "fr", "nl"],
  defaultLocale: "de",
  localePrefix: "as-needed",
});
