import { REPO_OWNER, REPO_NAME, LABEL_APPROVED, parseIssueBody, type Testimonial } from "@/lib/testimonials";

// Reading issues works with an unauthenticated request against the public
// GitHub API (low rate limit, ~60/hr per IP) — but if GITHUB_TESTIMONIALS_TOKEN
// is set we use it too, since it raises the limit substantially and this
// route can get hit on every page load.
const GITHUB_TOKEN = process.env.GITHUB_TESTIMONIALS_TOKEN;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&labels=${encodeURIComponent(LABEL_APPROVED)}&per_page=50`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
        },
        // Approved testimonials don't change minute to minute — cache
        // briefly to avoid re-hitting GitHub on every visit.
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return Response.json({ testimonials: [], error: `github_${res.status}` }, { status: 200 });
    }

    const issues: any[] = await res.json();
    const testimonials: Testimonial[] = issues
      .filter((issue) => !issue.pull_request) // issues endpoint also returns PRs
      .map((issue) => {
        const parsed = parseIssueBody(issue.body ?? "");
        return {
          id: issue.number,
          name: parsed.name,
          roleCompany: parsed.roleCompany,
          message: parsed.message,
          date: parsed.date ?? issue.created_at,
        };
      });

    return Response.json({ testimonials, error: null }, { status: 200 });
  } catch {
    return Response.json({ testimonials: [], error: "fetch_failed" }, { status: 200 });
  }
}
