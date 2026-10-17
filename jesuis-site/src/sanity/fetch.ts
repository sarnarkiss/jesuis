import { sanity } from "../lib/sanity";
import type { Locale } from "../i18n/routing";
import {
  featuredProductsQuery,
  otherPostsQuery,
  postBySlugQuery,
  postsQuery,
  productBySlugQuery,
  productsQuery,
  settingsQuery,
} from "./queries";
import type {
  Post,
  PostCard,
  Product,
  ProductCard,
  SiteSettings,
} from "./types";

const REVALIDATE = 60;

// Если Sanity недоступен, страница рендерится с пустыми данными, а не падает
async function query<T>(
  groq: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  try {
    const result = await sanity.fetch<T | null>(groq, params, {
      next: { revalidate: REVALIDATE },
    });
    return result ?? fallback;
  } catch (error) {
    console.error("[sanity] query failed", error);
    return fallback;
  }
}

export function fetchSettings() {
  return query<SiteSettings>(settingsQuery, {}, {});
}

export function fetchPosts(locale: Locale, limit = 100) {
  return query<PostCard[]>(postsQuery, { locale, limit }, []);
}

// Пока статей нет, «Мои мысли» скрываются из меню и с главной
export async function fetchHasPosts() {
  const count = await query<number>(`count(*[_type == "post" && defined(slug.current)])`, {}, 0);
  return count > 0;
}

export function fetchPost(locale: Locale, slug: string) {
  return query<Post | null>(postBySlugQuery, { locale, slug }, null);
}

export function fetchOtherPosts(locale: Locale, slug: string) {
  return query<PostCard[]>(otherPostsQuery, { locale, slug }, []);
}

export function fetchProducts(locale: Locale) {
  return query<ProductCard[]>(productsQuery, { locale }, []);
}

export async function fetchHomeProducts(locale: Locale) {
  const featured = await query<ProductCard[]>(
    featuredProductsQuery,
    { locale },
    [],
  );
  if (featured.length) return featured;
  return (await fetchProducts(locale)).slice(0, 6);
}

export function fetchProduct(locale: Locale, slug: string) {
  return query<Product | null>(productBySlugQuery, { locale, slug }, null);
}
