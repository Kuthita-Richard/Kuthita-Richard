// Testimonials are stored as GitHub Issues on this repo — no database
// needed. A submission opens an issue labeled "testimonial-pending"; moving
// the label to "testimonial-approved" is how you publish it. Nothing shows
// on the site until you've labeled it approved.
//
// Setup required once, on the repo itself: create two labels named exactly
// "testimonial-pending" and "testimonial-approved" (any color).

export const REPO_OWNER = "Kuthita-Richard";
export const REPO_NAME = "Kuthita-Richard";
export const LABEL_PENDING = "testimonial-pending";
export const LABEL_APPROVED = "testimonial-approved";

export type TestimonialSubmission = {
  name: string;
  roleCompany?: string;
  message: string;
};

export type Testimonial = {
  id: number;
  name: string;
  roleCompany: string | null;
  message: string;
  date: string;
};

/** Builds the GitHub issue title + body for a new submission. */
export function buildIssue(sub: TestimonialSubmission) {
  const title = `Testimonial from ${sub.name}`;
  const body = [
    `**Name:** ${sub.name}`,
    `**Role/Company:** ${sub.roleCompany?.trim() || "—"}`,
    `**Submitted:** ${new Date().toISOString()}`,
    "",
    sub.message.trim(),
  ].join("\n");
  return { title, body };
}

/** Parses an approved issue's body back into structured fields. */
export function parseIssueBody(body: string): Omit<Testimonial, "id" | "date"> & { date: string | null } {
  const nameMatch = body.match(/\*\*Name:\*\*\s*(.+)/);
  const roleMatch = body.match(/\*\*Role\/Company:\*\*\s*(.+)/);
  const dateMatch = body.match(/\*\*Submitted:\*\*\s*(.+)/);
  const messageMatch = body.split(/\*\*Submitted:\*\*.*\n+/)[1];

  const role = roleMatch?.[1]?.trim();
  return {
    name: nameMatch?.[1]?.trim() || "Anonymous",
    roleCompany: role && role !== "—" ? role : null,
    message: (messageMatch ?? body).trim(),
    date: dateMatch?.[1]?.trim() || null,
  };
}
