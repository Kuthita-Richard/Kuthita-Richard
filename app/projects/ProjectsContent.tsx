"use client";
import { useEffect, useState } from "react";
import { fetchGithubRepos, type GithubRepo } from "@/lib/github";
import { profile } from "@/data/profile";

export default function ProjectsContent() {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGithubRepos(profile.githubUsername).then(setRepos).catch((e) => setError(e.message));
  }, []);

  return (
    <>
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

      {repos === null && !error && (
        <div className="mt-8 text-sm text-slate dark:text-dk-slate">Loading projects...</div>
      )}

      {repos && repos.length > 0 && (
        <div className="mt-8 space-y-6">
          {repos.map((repo) => (
            <div key={repo.id} className="rounded border border-line dark:border-dk-line p-4 sm:p-6 hover:bg-surface dark:hover:bg-dk-surface transition-colors">
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-navy-deep dark:text-dk-ink hover:text-trace dark:hover:text-dk-trace transition-colors">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="mt-2 text-sm text-slate dark:text-dk-slate">{repo.description}</p>
                  )}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {repo.topics.map((topic) => (
                        <span key={topic} className="font-mono text-xs rounded bg-surface dark:bg-dk-surface px-2 py-1 text-slate dark:text-dk-slate">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                  {(repo.language || repo.stargazers_count > 0) && (
                    <div className="mt-3 flex gap-4 text-xs text-slate dark:text-dk-slate">
                      {repo.language && <span>{repo.language}</span>}
                      {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
                    </div>
                  )}
                </div>
                <div className="text-trace dark:text-dk-trace text-lg">↗</div>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
