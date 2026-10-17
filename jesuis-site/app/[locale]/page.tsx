import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { fetchHomeProducts, fetchPosts, fetchSettings } from "@/src/sanity/fetch";
import { isMailConfigured } from "@/src/lib/mail";
import Hero from "@/src/components/sections/Hero";
import Idea from "@/src/components/sections/Idea";
import ProductsPreview from "@/src/components/sections/ProductsPreview";
import PostsPreview from "@/src/components/sections/PostsPreview";
import LeadForm from "@/src/components/leadForm/LeadForm";
import ContactsSection from "@/src/components/sections/ContactsSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [settings, products, posts] = await Promise.all([
    fetchSettings(),
    fetchHomeProducts(locale),
    fetchPosts(locale, 3),
  ]);

  // «Кто я» объединён с первым экраном, философия — с приглашением в Telegram,
  // видео — на странице «Обо мне»
  return (
    <>
      <Hero photo={settings.heroPhoto} />
      <Idea settings={settings} />
      <ProductsPreview products={products} scrollOnMobile />
      {posts.length > 0 && <PostsPreview posts={posts} />}
      {isMailConfigured() && <LeadForm />}
      <ContactsSection settings={settings} />
    </>
  );
}
