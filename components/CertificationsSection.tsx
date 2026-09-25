"use client";
import { useEffect, useState } from "react";
import type { CredlyBadge } from "@/app/api/badges/route";

type BadgesResponse = { badges: CredlyBadge[]; error: string | null };

export default function CertificationsSection() {
  const [state, setState] = useState<BadgesResponse | null>(null);

  useEffect(() => {
    fetch("/api/badges")
      .then((r) => r.json())
      .then(setState)
      .catch(() => setState({ badges: [], error: "fetch_failed" }));
  }, []);

  // Not configured yet (no CREDLY_USER_ID) — quietly render nothing rather
  // than an error, since this is expected until it's set up.
  if (state?.error === "not_configured") return null;

  return (
    <section className="py-4">
      <h2 className="font-display text-xl font-bold text-navy-deep dark:text-dk-ink">Certifications &amp; Badges</h2>
      <div className="trace-line mt-3" />

      {state === null && (
        <div className="mt-6 text-sm text-slate dark:text-dk-slate">Loading badges...</div>
      )}

      {state?.error && state.error !== "not_configured" && (
        <div className="mt-6 rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface p-4 text-sm text-slate dark:text-dk-slate">
          Couldn&apos;t load badges right now. Refresh to try again.
        </div>
      )}

      {state && !state.error && state.badges.length === 0 && (
        <div className="mt-6 text-sm text-slate dark:text-dk-slate">No badges published yet.</div>
      )}

      {state && state.badges.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {state.badges.map((badge) => (
            <a
              key={badge.id}
              href={badge.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 rounded border border-line dark:border-dk-line p-3 text-center hover:bg-surface dark:hover:bg-dk-surface transition-colors"
            >
              {badge.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={badge.imageUrl} alt={badge.name} className="h-16 w-16 object-contain" loading="lazy" />
              )}
              <div>
                <p className="text-xs font-bold text-navy-deep dark:text-dk-ink leading-snug">{badge.name}</p>
                <p className="mt-0.5 text-[11px] text-slate dark:text-dk-slate">{badge.issuer}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
