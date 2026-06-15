import { profile } from "@/data/profile";
import CircuitTrace from "@/components/CircuitTrace";
import ProfileImage from "@/components/ProfileImage";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">

      {/* Hero */}
      <section className="py-12 sm:py-20 flex flex-col-reverse sm:flex-row gap-8 sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-trace dark:text-dk-trace">
            {profile.location}
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-tight text-navy-deep dark:text-dk-ink">
            {profile.name}
          </h1>
          <p className="mt-2 font-display text-base sm:text-lg text-navy dark:text-dk-navy">{profile.tagline}</p>
          <p className="mt-5 text-sm sm:text-base text-slate dark:text-dk-slate leading-relaxed max-w-2xl">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
            <a href="/api/resume" className="rounded border border-navy-deep dark:border-dk-navy bg-navy-deep dark:bg-dk-navy px-4 py-2.5 text-white hover:bg-navy dark:hover:opacity-90 transition-colors">
              Download ATS Resume (PDF)
            </a>
            <a href="/hire-me" className="rounded border border-navy-deep dark:border-dk-navy px-4 py-2.5 text-navy-deep dark:text-dk-navy hover:bg-navy-deep dark:hover:bg-dk-navy hover:text-white transition-colors">
              Hire Me →
            </a>
          </div>
        </div>
        <ProfileImage name={profile.name} />
      </section>

      {/* Circuit trace signature */}
      <section className="py-4 overflow-x-auto">
        <CircuitTrace
          className="mx-auto h-auto min-w-[480px] max-w-full"
          labels={["FRONTEND", "JAVA · ERP", "QA · TESTING", "AI · ML · WEB3"]}
        />
      </section>

      {/* Skills */}
      <section className="py-14">
        <SectionHeading>Technical Skills</SectionHeading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <SkillBlock title="Languages" items={profile.skills.languages} />
          <SkillBlock title="Frontend Frameworks & Libraries" items={profile.skills.frontend} />
          <SkillBlock title="Build Tools & DevOps" items={profile.skills.tools} />
          <SkillBlock title="Hardware & Electronics" items={profile.skills.hardware} />
          <SkillBlock title="Domains & Concepts" items={profile.skills.domains} />
          <SkillBlock title="Growth Track — AI · ML · Web3" items={profile.skills.emerging} accent />
        </div>
      </section>

      {/* Competencies */}
      <section className="py-14">
        <SectionHeading>Professional Competencies</SectionHeading>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {profile.competencies.map((c) => (
            <div key={c.title} className="border-l-2 border-trace dark:border-dk-trace pl-4">
              <p className="font-display text-sm font-bold text-navy-deep dark:text-dk-ink">{c.title}</p>
              <p className="mt-1 text-sm text-slate dark:text-dk-slate">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="py-14">
        <SectionHeading>Education</SectionHeading>
        <div className="mt-8 space-y-4">
          {profile.education.map((e) => (
            <div key={e.school} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <p className="font-mono text-sm text-trace dark:text-dk-trace shrink-0">{e.period}</p>
              <div>
                <p className="font-display font-bold text-navy-deep dark:text-dk-ink">{e.school}</p>
                <p className="text-sm text-slate dark:text-dk-slate">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="font-display text-2xl font-bold text-navy-deep dark:text-dk-ink">{children}</h2>
      <div className="trace-line mt-3" />
    </>
  );
}

function SkillBlock({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div>
      <p className="font-display text-sm font-bold text-navy-deep dark:text-dk-ink">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded border px-2.5 py-1 font-mono text-xs ${
              accent
                ? "border-trace/50 dark:border-dk-trace/50 bg-trace/10 dark:bg-dk-trace/10 text-navy-deep dark:text-dk-ink"
                : "border-line dark:border-dk-line bg-surface dark:bg-dk-surface text-slate dark:text-dk-slate"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
