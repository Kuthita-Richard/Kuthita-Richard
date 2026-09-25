"use client";
import { useState } from "react";
import { updates, updateTypeLabels } from "@/data/updates";
import CertificationsSection from "@/components/CertificationsSection";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const typeBadgeClass: Record<string, string> = {
  project: "border-navy/40 dark:border-dk-navy/40 text-navy dark:text-dk-navy",
  milestone: "border-trace/50 dark:border-dk-trace/50 text-trace-text dark:text-dk-trace",
  note: "border-line dark:border-dk-line text-slate dark:text-dk-slate",
};

export default function UpdatesContent() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sorted = [...updates].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate dark:text-dk-slate">
        Screenshots of UI work that never makes it to GitHub, plus milestones like courses,
        bootcamps, and events.
      </p>
      <div className="trace-line mt-6" />

      <div className="mt-10">
        <CertificationsSection />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-xl font-bold text-navy-deep dark:text-dk-ink">Feed</h2>
        <div className="trace-line mt-3" />

        <div className="mt-6 space-y-8">
          {sorted.map((entry) => (
            <article key={entry.id} className="rounded border border-line dark:border-dk-line p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${typeBadgeClass[entry.type]}`}>
                  {updateTypeLabels[entry.type]}
                </span>
                <span className="font-mono text-xs text-slate dark:text-dk-slate">{formatDate(entry.date)}</span>
              </div>

              <h3 className="mt-3 font-display font-bold text-navy-deep dark:text-dk-ink">{entry.title}</h3>
              <p className="mt-2 text-sm text-slate dark:text-dk-slate leading-relaxed">{entry.description}</p>

              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs rounded bg-surface dark:bg-dk-surface px-2 py-1 text-slate dark:text-dk-slate">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {entry.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {entry.images.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt={entry.title}
                      className="aspect-video w-full cursor-zoom-in rounded border border-line dark:border-dk-line object-cover"
                      onClick={() => setLightbox(src)}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}

              {entry.links && entry.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
                  {entry.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-navy dark:text-dk-navy hover:text-trace dark:hover:text-dk-trace transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-h-full max-w-full rounded shadow-lg" />
        </div>
      )}
    </>
  );
}
