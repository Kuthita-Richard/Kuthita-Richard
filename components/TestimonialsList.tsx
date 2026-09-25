"use client";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/testimonials";

type Response = { testimonials: Testimonial[]; error: string | null };

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function TestimonialsList() {
  const [state, setState] = useState<Response | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then(setState)
      .catch(() => setState({ testimonials: [], error: "fetch_failed" }));
  }, []);

  return (
    <section>
      {state === null && (
        <div className="text-sm text-slate dark:text-dk-slate">Loading testimonials...</div>
      )}

      {state?.error && (
        <div className="rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface p-4 text-sm text-slate dark:text-dk-slate">
          Couldn&apos;t load testimonials right now. Refresh to try again.
        </div>
      )}

      {state && !state.error && state.testimonials.length === 0 && (
        <div className="rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface p-4 text-sm text-slate dark:text-dk-slate">
          No testimonials published yet — be the first to leave one below.
        </div>
      )}

      {state && state.testimonials.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {state.testimonials.map((t) => (
            <div key={t.id} className="rounded border border-line dark:border-dk-line p-4 sm:p-5">
              <p className="text-sm text-slate dark:text-dk-slate leading-relaxed whitespace-pre-wrap">{t.message}</p>
              <div className="mt-4 border-t border-line dark:border-dk-line pt-3">
                <p className="font-display text-sm font-bold text-navy-deep dark:text-dk-ink">{t.name}</p>
                {t.roleCompany && (
                  <p className="text-xs text-slate dark:text-dk-slate">{t.roleCompany}</p>
                )}
                {t.date && (
                  <p className="mt-1 font-mono text-[11px] text-slate dark:text-dk-slate">{formatDate(t.date)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
