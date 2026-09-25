import { siteUrl } from "@/data/profile";

/**
 * Renders a BreadcrumbList JSON-LD block. Pass just the current page's
 * name and path — "Home" is prepended automatically.
 *
 * Usage: <BreadcrumbSchema page="Projects" path="/projects" />
 */
export default function BreadcrumbSchema({ page, path }: { page: string; path: string }) {
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: page, item: `${siteUrl}${path}` },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
