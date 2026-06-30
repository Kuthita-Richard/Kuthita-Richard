# Richard Kuthita — Portfolio
 https://richardkuthita.vercel.app/

Built with **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** + **Tailwind CSS**.

## Features

- **Profile page** — summary, skills, competencies, education A(from `data/profile.ts`)
- **Projects page** — fetched live, client-side, from the GitHub public API (`api.github.com/users/Kuthita-Richard/repos`). Push a new public repo and it appears here automatically — nothing is hardcoded.
- **Hire Me page** — employers pick an engagement type (Permanent / Contract) and any role(s) from grouped categories, see a live summary, and can send it straight to your inbox via a pre-filled email.
- **ATS resume (PDF)** — generated on demand at `/api/resume` from the same `data/profile.ts`, using `@react-pdf/renderer`. Single-column, no tables or graphics, so it parses cleanly in Applicant Tracking Systems.
