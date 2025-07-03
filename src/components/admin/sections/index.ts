import { AdminHero } from "./AdminHero";
import { AdminFeatures } from "./AdminFeatures";
import { AdminPricing } from "./AdminPricing";
import { AdminMobileDownload } from "./AdminMobileDownload";
import { AdminFAQ } from "./AdminFAQ";
import { AdminAboutARPI } from "./AdminAboutARPI";

export { AdminHero } from "./AdminHero";
export { AdminFeatures } from "./AdminFeatures";
export { AdminPricing } from "./AdminPricing";
export { AdminMobileDownload } from "./AdminMobileDownload";
export { AdminFAQ } from "./AdminFAQ";
export { AdminAboutARPI } from "./AdminAboutARPI";

// Section components map for dynamic rendering
export const sectionComponents = {
  "hero-section": AdminHero,
  "features-section": AdminFeatures,
  "pricing-section": AdminPricing,
  "mobile-download-section": AdminMobileDownload,
  "faq-section": AdminFAQ,
  "about-arpi-section": AdminAboutARPI,
};