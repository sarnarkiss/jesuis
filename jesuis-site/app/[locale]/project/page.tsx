import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { fetchSettings } from "@/src/sanity/fetch";
import ProjectButton, { isProjectOpen } from "@/src/components/projectButton/ProjectButton";
import ProjectThemes from "@/src/components/sections/ProjectThemes";

import "./styles.scss";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "project" });
  return { title: `${t("title")} — ${t("subtitle")}`, description: t("lead") };
}

export default async function ProjectPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, settings] = await Promise.all([getTranslations("project"), fetchSettings()]);
  const isOpen = isProjectOpen(settings);

  return (
    <>
      <section className="project-hero">
        <div className="container project-hero__inner">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="project-hero__title">{t("title")}</h1>
          <p className="project-hero__subtitle">{t("subtitle")}</p>
          <p className="project-hero__lead">{t("lead")}</p>
          <ProjectButton settings={settings} variant="light" />
          <p className="project-hero__note">{isOpen ? t("openNote") : t("soonNote")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container project-body">
          <h2 className="section-title">{t("themesTitle")}</h2>
          <ProjectThemes />
        </div>
      </section>

      <section className="section">
        <div className="container-text project-quote">
          <blockquote>{t("quote")}</blockquote>
        </div>
      </section>

    </>
  );
}
