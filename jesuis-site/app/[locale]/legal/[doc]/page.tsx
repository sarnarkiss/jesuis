import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/src/i18n/routing";
import { Link } from "@/src/i18n/navigation";
import { legalDocs, type LegalDoc } from "@/src/components/header/navItems";
import { fetchSettings } from "@/src/sanity/fetch";
import { CONTACT_EMAIL } from "@/src/lib/site";

import "@/src/components/richText/styles.scss";

type Props = { params: Promise<{ locale: Locale; doc: string }> };

function isLegalDoc(value: string): value is LegalDoc {
  return (legalDocs as readonly string[]).includes(value);
}

// В текстах документов {email} становится ссылкой на почту, {privacy} — ссылкой на политику
function renderParagraph(text: string, email: string, privacyLabel: string) {
  return text.split(/(\{email\}|\{privacy\})/).map((part, i) => {
    if (part === "{email}") {
      return (
        <a key={i} href={`mailto:${email}`}>
          {email}
        </a>
      );
    }
    if (part === "{privacy}") {
      return (
        <Link key={i} href="/legal/privacy">
          {privacyLabel}
        </Link>
      );
    }
    return part;
  });
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => legalDocs.map((doc) => ({ locale, doc })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLegalDoc(doc)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t(doc), robots: { index: false } };
}

export default async function LegalPage({ params }: Props) {
  const { locale, doc } = await params;
  if (!isLegalDoc(doc)) notFound();
  setRequestLocale(locale);

  const [t, settings] = await Promise.all([getTranslations("legal"), fetchSettings()]);
  const email = settings.email || CONTACT_EMAIL;
  const paragraphs = t.raw(`docs.${doc}`) as string[];

  return (
    <section className="page-head">
      <div className="container-text">
        <h1 className="page-head__title">{t(doc)}</h1>
        <div className="rich-text legal-text">
          {paragraphs.map((text, i) => (
            <p key={i}>{renderParagraph(text, email, t("privacy"))}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
