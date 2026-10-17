import { useTranslations } from "next-intl";
import type { SiteSettings } from "@/src/sanity/types";
import { CONTACT_EMAIL } from "@/src/lib/site";
import SocialLinks from "../socialLinks/SocialLinks";
import { TelegramIcon } from "../icons/Icons";

import "./styles.scss";

export default function ContactsSection({
  settings,
  asPageHead = false,
  children,
}: {
  settings: SiteSettings;
  asPageHead?: boolean;
  children?: React.ReactNode;
}) {
  const t = useTranslations("contacts");
  const Title = asPageHead ? "h1" : "h2";

  return (
    <section className="section contacts">
      <div className="container contacts__inner">
        <div className="contacts__info">
          <span className="eyebrow">{t("eyebrow")}</span>
          <Title className="contacts__title">{t("title")}</Title>
          <SocialLinks settings={{ ...settings, email: settings.email || CONTACT_EMAIL }} withLabels />
          {settings.telegramUrl && (
            <a
              href={settings.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary contacts__write"
            >
              <TelegramIcon size={18} /> {t("write")}
            </a>
          )}
        </div>
        {children && <div className="contacts__extra">{children}</div>}
      </div>
    </section>
  );
}
