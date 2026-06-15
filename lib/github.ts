export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const GITHUB_API = "https://api.github.com";

/**
 * Fetches public, non-fork repositories for a GitHub user, sorted by most
 * recently updated. Runs entirely client-side against the public GitHub
 * REST API (no token required, CORS-enabled).
 */
export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&type=owner`,
    {
      headers: { Accept: "application/vnd.github+json" },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const repos: GithubRepo[] = await res.json();

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}
