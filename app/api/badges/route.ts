// Fetches badges from Credly for the Certifications section.
//
// Credly doesn't offer a public API for individual users (their REST API is
// org-only), but a public profile's badge wall is backed by an internal JSON
// endpoint the profile page itself calls. That endpoint is undocumented and
// keyed by the profile's UUID, not username, so it has to be configured via
// CREDLY_USER_ID rather than derived from anything in this repo.
//
// Because it's unofficial: this can break if Credly changes shape. Keep
// this route as the single place that knows about it, fail soft (empty
// array + a flag), and cache briefly so we're not hammering their server on
// every page load.

export type CredlyBadge = {
  id: string;
  name: string;
  issuer: string;
  imageUrl: string;
  earnedDate: string | null;
  verifyUrl: string;
};

const CREDLY_USER_ID = process.env.CREDLY_USER_ID;

export async function GET() {
  if (!CREDLY_USER_ID) {
    return Response.json(
      { badges: [], error: "not_configured" },
      { status: 200 }
    );
  }

  try {
    const res = await fetch(
      `https://www.credly.com/api/v1/users/${CREDLY_USER_ID}/badges?page=1&page_size=48&sort=-issued_at`,
      {
        headers: { Accept: "application/json" },
        // Revalidate at most once an hour — badges don't change often
        // enough to justify fetching Credly on every request.
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return Response.json(
        { badges: [], error: `credly_${res.status}` },
        { status: 200 }
      );
    }

    const data = await res.json();
    const rawBadges: unknown[] = Array.isArray(data?.data) ? data.data : [];

    const badges: CredlyBadge[] = rawBadges.map((item) => {
      const b = item as Record<string, any>;
      const template = b.badge_template ?? {};
      const issuerEntity = template.issuer?.entities?.[0]?.entity;
      return {
        id: b.id,
        name: template.name ?? "Untitled badge",
        issuer: issuerEntity?.name ?? "Unknown issuer",
        imageUrl: template.image_url ?? "",
        earnedDate: b.issued_at ?? null,
        verifyUrl: b.public_url ?? `https://www.credly.com/badges/${b.id}`,
      };
    });

    return Response.json({ badges, error: null }, { status: 200 });
  } catch {
    return Response.json(
      { badges: [], error: "fetch_failed" },
      { status: 200 }
    );
  }
}
