import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { SiteSettings } from "@/src/sanity/types";
import ProjectButton, { isProjectOpen } from "../projectButton/ProjectButton";
import { ArrowIcon } from "../icons/Icons";

import "./styles.scss";

// Философия JE SUIS и приглашение в Telegram — один блок вместо двух подряд
export default function Idea({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("idea");
  const tProject = useTranslations("project");
  const not = t.raw("not") as string[];
  const questions = t.raw("questions") as string[];
  const isOpen = isProjectOpen(settings);

  return (
    <section className="idea">
      <div className="container idea__inner">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="idea__title">{t("title")}</h2>

        <div className="idea__columns">
          <ul className="idea__not">
            {not.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <div className="idea__but">
            <p className="idea__but-label">{t("but")}</p>
            <ul className="idea__questions">
              {questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="idea__outro">{t("outro")}</p>

        {/* Приглашение в Telegram — когда проект открыт; ссылка на проект — всегда */}
        <div className="idea__invite">
          {isOpen && (
            <>
              <p className="idea__invite-text">{tProject("telegram.text")}</p>
              <p className="idea__invite-text">{tProject("telegram.hint")}</p>
              <p className="idea__invite-welcome">{tProject("telegram.welcome")}</p>
            </>
          )}
          <div className="idea__invite-actions">
            {isOpen && <ProjectButton settings={settings} variant="light" />}
            <Link href="/project" className="link-arrow">
              {t("projectLink")} <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
