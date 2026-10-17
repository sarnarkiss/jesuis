import { getTranslations } from "next-intl/server";

import { Link } from "@/src/i18n/navigation";
import type { Locale } from "@/src/i18n/routing";
import { fetchHasPosts, fetchSettings } from "@/src/sanity/fetch";
import { footerNav, legalDocs, visibleNav } from "../header/navItems";
import SocialLinks from "../socialLinks/SocialLinks";

import "./styles.scss";

const baseClassName = "footer";

export default async function Footer({ locale }: { locale: Locale }) {
  const [t, settings, hasPosts] = await Promise.all([
    getTranslations({ locale }),
    fetchSettings(),
    fetchHasPosts(),
  ]);

  return (
    <footer className={baseClassName}>
      <div className={`container ${baseClassName}__inner`}>
        <div className={`${baseClassName}__brand`}>
          <Link href="/" className={`${baseClassName}__logo`}>
            JE SUIS
          </Link>
          <p className={`${baseClassName}__role`}>{t("brand.role")}</p>
          <p className={`${baseClassName}__formats`}>{t("brand.formats")}</p>
          <SocialLinks settings={settings} tone="dark" />
        </div>

        <nav className={`${baseClassName}__nav`} aria-label="Footer">
          {visibleNav(footerNav, hasPosts).map(({ key, href }) => (
            <Link key={key} href={href} className={`${baseClassName}__link`}>
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <nav className={`${baseClassName}__nav`} aria-label={t("footer.legalTitle")}>
          {legalDocs.map((doc) => (
            <Link key={doc} href={`/legal/${doc}`} className={`${baseClassName}__link`}>
              {t(`legal.${doc}`)}
            </Link>
          ))}
        </nav>
      </div>

      <div className={`container ${baseClassName}__bottom`}>
        © {new Date().getFullYear()} JE SUIS · {t("brand.name")}. {t("footer.rights")}
      </div>
    </footer>
  );
}
