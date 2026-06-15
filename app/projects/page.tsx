"use client";
import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { fetchGithubRepos, type GithubRepo } from "@/lib/github";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Projects — Richard Kuthita",
  description: `Portfolio of ${profile.name}'s projects including ${profile.skills.frontend.join(", ")} work. View all GitHub repositories and technical work.`,
  keywords: ["projects", "portfolio", "GitHub", "React", "Next.js", "TypeScript", "full stack"],
  openGraph: {
    title: "Projects — Richard Kuthita",
    description: `Portfolio of ${profile.name}'s projects and technical work.`,
    url: "https://kuthita-richard.vercel.app/projects",
  },
};

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGithubRepos(profile.githubUsername).then(setRepos).catch((e) => setError(e.message));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep dark:text-dk-ink">Projects</h1>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate dark:text-dk-slate">
        Pulled live from{" "}
        <a className="font-mono text-navy dark:text-dk-navy hover:text-trace dark:hover:text-dk-trace transition-colors" href={`https://${profile.github}`} target="_blank" rel="noreferrer">
          {profile.github}
        </a>
        . New repositories appear automatically — nothing on this page is hardcoded.
      </p>
      <div className="trace-line mt-6" />

      {error && (
        <div className="mt-8 rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface p-4 text-sm text-slate dark:text-dk-slate">
          Couldn&apos;t reach GitHub right now ({error}). Refresh to try again.
        </div>
      )}

      {!repos && !error && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[0,1,2,3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface" />
          ))}
        </div>
      )}

      {repos?.length === 0 && (
        <p className="mt-8 text-sm text-slate dark:text-dk-slate">No public repositories found yet.</p>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {repos?.map((repo) => {
          const curated = profile.projects.find((p) => p.githubRepo === repo.name);
          return (
            <article
              key={repo.id}
              className="flex flex-col gap-3 rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-base sm:text-lg font-bold text-navy-deep dark:text-dk-ink leading-snug">
                  {curated?.name ?? repo.name}
                </h2>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 font-mono text-xs text-navy dark:text-dk-navy hover:text-trace dark:hover:text-dk-trace transition-colors"
                >
                  repo →
                </a>
              </div>

              <p className="text-sm text-slate dark:text-dk-slate leading-relaxed">
                {curated?.description ?? repo.description ?? "No description provided."}
              </p>

              {curated?.highlights && (
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-slate dark:text-dk-slate">
                  {curated.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}
                </ul>
              )}

              <div className="mt-auto pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                {(curated?.stack ?? (repo.language ? [repo.language] : [])).map((t) => (
                  <span key={t} className="rounded border border-line dark:border-dk-line px-2 py-0.5 text-slate dark:text-dk-slate">
                    {t}
                  </span>
                ))}
                {repo.topics?.slice(0, 3).map((t) => (
                  <span key={t} className="rounded border border-trace/40 dark:border-dk-trace/40 bg-trace/10 dark:bg-dk-trace/10 px-2 py-0.5 text-navy-deep dark:text-dk-ink">
                    {t}
                  </span>
                ))}
                <span className="ml-auto text-slate dark:text-dk-slate">
                  ★ {repo.stargazers_count} · {new Date(repo.pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
