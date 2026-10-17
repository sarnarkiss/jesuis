import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { fetchPosts } from "@/src/sanity/fetch";
import PostCard from "@/src/components/postCard/PostCard";
import LeadForm from "@/src/components/leadForm/LeadForm";
import { isMailConfigured } from "@/src/lib/mail";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, posts] = await Promise.all([getTranslations("blog"), fetchPosts(locale)]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="page-head__title">{t("title")}</h1>
        </div>
      </section>

      <section className="container">
        {posts.length ? (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="empty-note">{t("empty")}</p>
        )}
      </section>

      {isMailConfigured() && <LeadForm />}
    </>
  );
}
