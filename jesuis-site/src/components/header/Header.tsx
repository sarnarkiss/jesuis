"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/src/i18n/navigation";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { mainNav, visibleNav } from "./navItems";

import "./styles.scss";

const baseClassName = "header";

export default function Header({ hasPosts }: { hasPosts: boolean }) {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const nav = visibleNav(mainNav, hasPosts);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header id="header" className={baseClassName}>
        <div className={clsx("container", `${baseClassName}__inner`)}>
          <Link href="/" className={`${baseClassName}__logo`} onClick={close}>
            <span className={`${baseClassName}__logo-mark`}>JE SUIS</span>
            <span className={`${baseClassName}__logo-name`}>{tBrand("name")}</span>
          </Link>

          <nav className={`${baseClassName}__nav`} aria-label="Primary">
            {nav.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={clsx(
                  `${baseClassName}__link`,
                  isActive(href) && `${baseClassName}__link--active`,
                )}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {t(key)}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          <button
            type="button"
            className={`${baseClassName}__burger`}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Меню вне <header>: backdrop-filter шапки ломает position: fixed у потомков */}
      <div
        className={clsx(`${baseClassName}__drawer`, open && `${baseClassName}__drawer--open`)}
        aria-hidden={!open}
      >
        <nav className={`${baseClassName}__drawer-nav`}>
          {nav.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              tabIndex={open ? 0 : -1}
              onClick={close}
              className={clsx(
                `${baseClassName}__drawer-link`,
                isActive(href) && `${baseClassName}__drawer-link--active`,
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </>
  );
}
