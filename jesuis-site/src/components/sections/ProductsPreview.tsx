import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { ProductCard as ProductCardData } from "@/src/sanity/types";
import ProductCard from "../productCard/ProductCard";
import { ArrowIcon } from "../icons/Icons";

import "./styles.scss";

export default function ProductsPreview({
  products,
  scrollOnMobile = false,
}: {
  products: ProductCardData[];
  scrollOnMobile?: boolean;
}) {
  const t = useTranslations("products");

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="section-title">{t("title")}</h2>
          </div>
          <Link href="/products" className="link-arrow">
            {t("viewAll")} <ArrowIcon />
          </Link>
        </div>

        {products.length ? (
          <div className={scrollOnMobile ? "product-grid product-grid--scroll" : "product-grid"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="empty-note">{t("empty")}</p>
        )}
      </div>
    </section>
  );
}
