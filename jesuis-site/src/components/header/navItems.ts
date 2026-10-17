export type NavItem = {
  key: "home" | "about" | "books" | "products" | "project" | "blog" | "contact";
  href: string;
};

export const mainNav: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "project", href: "/project" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "books", href: "/products?category=book" },
  { key: "products", href: "/products" },
  { key: "project", href: "/project" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

// Пункты меню без «Мои мысли», если статей ещё нет
export function visibleNav(items: NavItem[], hasPosts: boolean) {
  return hasPosts ? items : items.filter((item) => item.key !== "blog");
}

export const legalDocs = ["privacy", "terms", "personal-data"] as const;
export type LegalDoc = (typeof legalDocs)[number];
