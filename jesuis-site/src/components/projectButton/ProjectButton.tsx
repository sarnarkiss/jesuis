import { useTranslations } from "next-intl";
import type { SiteSettings } from "@/src/sanity/types";
import { TelegramIcon } from "../icons/Icons";

// Проект открыт, только если в админке статус «Открыт» и указана ссылка
export function isProjectOpen(settings: SiteSettings) {
  return settings.mainProjectStatus === "open" && Boolean(settings.mainProjectUrl);
}

// Кнопка главного проекта: «Скоро» или «Перейти в Telegram» — переключается в админке
export default function ProjectButton({
  settings,
  variant = "primary",
}: {
  settings: SiteSettings;
  variant?: "primary" | "light";
}) {
  const t = useTranslations("project");

  if (!isProjectOpen(settings)) {
    return (
      <span className={`btn btn--${variant === "light" ? "light" : "outline"}`} aria-disabled="true">
        {t("soon")}
      </span>
    );
  }

  return (
    <a
      href={settings.mainProjectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--${variant === "light" ? "gold" : "primary"}`}
    >
      <TelegramIcon size={18} /> {t("join")}
    </a>
  );
}
