import type { Metadata } from "next";
import Link from "next/link";
import { profile, siteUrl } from "@/data/profile";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Experience | Richard Kuthita",
  description: `Work experience of ${profile.name}: ICT and data support, Excel and Power BI reporting, and hospital finance systems at Reliable Healthcare Masinga.`,
  keywords: ["experience", "work experience", "Power BI", "Excel", "Power Query", "ICT support", "Richard Kuthita"],
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | Richard Kuthita",
    description: `Work experience of ${profile.name}.`,
    url: `${siteUrl}/experience`,
  },
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <BreadcrumbSchema page="Experience" path="/experience" />
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep dark:text-dk-ink">Experience</h1>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate dark:text-dk-slate">
        Where I&apos;ve worked, what I did there, and what the people I worked with said about it.
      </p>
      <div className="trace-line mt-6" />

      <ol className="mt-10 space-y-12 border-l border-line dark:border-dk-line pl-6 sm:pl-8">
        {profile.experience.map((job) => (
          <li key={`${job.organization}-${job.period}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[30px] sm:-left-[38px] top-1.5 h-3 w-3 rounded-full border-2 border-trace dark:border-dk-trace bg-paper dark:bg-dk-bg"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-trace-text dark:text-dk-trace">{job.period}</p>
            <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-navy-deep dark:text-dk-ink">
              {job.organization}
            </h2>
            <p className="mt-1 text-sm text-slate dark:text-dk-slate">
              {job.role} · {job.location}
            </p>
            <p className="mt-3 text-sm text-slate dark:text-dk-slate leading-relaxed">{job.summary}</p>

            <ul className="mt-4 space-y-2 text-sm text-slate dark:text-dk-slate leading-relaxed">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden className="text-trace-text dark:text-dk-trace">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
              {job.letter && (
                <a
                  href={job.letter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-navy dark:text-dk-navy hover:text-trace dark:hover:text-dk-trace transition-colors"
                >
                  Recommendation letter (PDF) ↗
                </a>
              )}
              <Link
                href="/updates"
                className="text-navy dark:text-dk-navy hover:text-trace dark:hover:text-dk-trace transition-colors"
              >
                See it in Updates →
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
