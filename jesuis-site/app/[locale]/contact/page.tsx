import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { fetchSettings } from "@/src/sanity/fetch";
import ContactsSection from "@/src/components/sections/ContactsSection";
import ContactForm from "@/src/components/contactForm/ContactForm";
import { isMailConfigured } from "@/src/lib/mail";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts" });
  return { title: t("title") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const settings = await fetchSettings();

  return (
    <ContactsSection settings={settings} asPageHead>
      {isMailConfigured() && <ContactForm />}
    </ContactsSection>
  );
}
