import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { SanityImage as SanityImageData } from "@/src/sanity/types";
import PhotoPlaceholder from "../photoPlaceholder/PhotoPlaceholder";
import SanityImage from "../sanityImage/SanityImage";

import "./styles.scss";

export default function Hero({ photo }: { photo?: SanityImageData }) {
  const t = useTranslations("hero");
  const tBrand = useTranslations("brand");

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">JE SUIS · {tBrand("name")}</span>
          <h1 className="hero__title">{t("title")}</h1>
          <p className="hero__lead">{t("lead")}</p>
          <p className="hero__text">{t("text")}</p>
          <div className="hero__actions">
            <Link href="/about" className="btn btn--primary">
              {t("ctaAbout")}
            </Link>
            <Link href="/products" className="btn btn--outline">
              {t("ctaProducts")}
            </Link>
          </div>
        </div>

        {/* Фото показывается целиком: блок берёт пропорции самого снимка */}
        <div
          className="hero__photo"
          style={photo ? ({ "--photo-ratio": photo.width / photo.height } as CSSProperties) : undefined}
        >
          {photo ? (
            <SanityImage
              image={photo}
              alt={`${tBrand("name")} — JE SUIS`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <PhotoPlaceholder label={t("photo")} />
          )}
        </div>
      </div>
    </section>
  );
}
