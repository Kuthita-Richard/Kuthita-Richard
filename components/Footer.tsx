import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line dark:border-dk-line bg-paper dark:bg-dk-bg mt-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-bold text-navy-deep dark:text-dk-ink">{profile.name}</p>
          <p className="font-mono text-xs text-slate dark:text-dk-slate mt-0.5">{profile.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate dark:text-dk-slate">
          <a className="hover:text-navy dark:hover:text-dk-ink transition-colors" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="hover:text-navy dark:hover:text-dk-ink transition-colors" href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">{profile.linkedin}</a>
          <a className="hover:text-navy dark:hover:text-dk-ink transition-colors" href={`https://${profile.github}`} target="_blank" rel="noreferrer">{profile.github}</a>
        </div>
      </div>
      <div className="trace-line mx-auto max-w-5xl" />
      <p className="px-6 py-4 text-center font-mono text-[11px] text-slate dark:text-dk-slate">
        © {new Date().getFullYear()} {profile.name} — Built with Next.js 16
      </p>
    </footer>
  );
}
