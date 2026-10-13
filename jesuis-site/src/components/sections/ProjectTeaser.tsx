import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { SiteSettings } from "@/src/sanity/types";
import ProjectButton, { isProjectOpen } from "../projectButton/ProjectButton";
import ProjectThemes from "./ProjectThemes";

import "./styles.scss";

export default function ProjectTeaser({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("project");
  const isOpen = isProjectOpen(settings);

  const moreLink = (
    <Link href="/project" className="btn btn--light">
      {t("more")}
    </Link>
  );

  return (
    <section className="section">
      <div className="container">
        <div className="project-teaser">
          <div className="project-teaser__head">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="project-teaser__title">{t("title")}</h2>
            <p className="project-teaser__subtitle">{t("subtitle")}</p>
            <p className="project-teaser__lead">{t("lead")}</p>
            <blockquote className="project-teaser__quote">{t("quote")}</blockquote>

            {/* Подводка к кнопке Telegram: показывается, когда проект открыт */}
            {isOpen && (
              <div className="project-teaser__telegram">
                <p className="project-teaser__telegram-title">{t("telegram.title")}</p>
                <p className="project-teaser__telegram-text">{t("telegram.text")}</p>
                <p className="project-teaser__telegram-text">{t("telegram.hint")}</p>
                <p className="project-teaser__telegram-welcome">{t("telegram.welcome")}</p>
              </div>
            )}

            <div className="project-teaser__actions">
              {isOpen ? (
                <>
                  <ProjectButton settings={settings} variant="light" />
                  {moreLink}
                </>
              ) : (
                <>
                  {moreLink}
                  <ProjectButton settings={settings} variant="light" />
                </>
              )}
            </div>
          </div>

          <div className="project-teaser__themes">
            <p className="project-teaser__themes-title">{t("themesTitle")}</p>
            <ProjectThemes />
          </div>
        </div>
      </div>
    </section>
  );
}
