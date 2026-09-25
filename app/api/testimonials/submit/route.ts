import { REPO_OWNER, REPO_NAME, LABEL_PENDING, buildIssue, type TestimonialSubmission } from "@/lib/testimonials";

const GITHUB_TOKEN = process.env.GITHUB_TESTIMONIALS_TOKEN;

// Basic guardrails so a bot can't fill the queue with junk before a human
// ever looks at it — GitHub itself also rate-limits and flags abusive
// content, this is just a cheap first filter.
const MAX_NAME_LEN = 80;
const MAX_ROLE_LEN = 120;
const MIN_MESSAGE_LEN = 10;
const MAX_MESSAGE_LEN = 2000;

export async function POST(req: Request) {
  if (!GITHUB_TOKEN) {
    return Response.json({ error: "Submissions aren't configured yet." }, { status: 503 });
  }

  let body: Partial<TestimonialSubmission>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const roleCompany = (body.roleCompany ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || name.length > MAX_NAME_LEN) {
    return Response.json({ error: "Please provide a valid name." }, { status: 400 });
  }
  if (roleCompany.length > MAX_ROLE_LEN) {
    return Response.json({ error: "Role/company is too long." }, { status: 400 });
  }
  if (message.length < MIN_MESSAGE_LEN || message.length > MAX_MESSAGE_LEN) {
    return Response.json(
      { error: `Message must be between ${MIN_MESSAGE_LEN} and ${MAX_MESSAGE_LEN} characters.` },
      { status: 400 }
    );
  }

  const { title, body: issueBody } = buildIssue({ name, roleCompany, message });

  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body: issueBody, labels: [LABEL_PENDING] }),
  });

  if (!res.ok) {
    return Response.json({ error: "Couldn't submit right now. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
