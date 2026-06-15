"use client";
import { useMemo, useState } from "react";
import { profile, roleGroups, contractTypes } from "@/data/profile";

// WhatsApp number — no + or spaces
const WA_NUMBER = "254742450802";

function buildMessage(contract: string | null, roles: string[]) {
  const lines = [
    `Hi ${profile.name.split(" ")[0]}! I came across your portfolio and I'd like to discuss an opportunity.`,
    "",
    `*Engagement type:* ${contract ?? "(not yet specified)"}`,
    "",
    "*Role(s) of interest:*",
    ...(roles.length ? roles.map((r) => `• ${r}`) : ["• (not yet specified)"]),
    "",
    "Please let me know your availability. Looking forward to connecting!",
  ];
  return lines.join("\n");
}

export default function HireMePage() {
  const [contractType, setContractType] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  const allRoles = useMemo(() => roleGroups.flatMap((g) => g.roles), []);

  function toggleRole(id: string) {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const chosenContract = contractTypes.find((c) => c.id === contractType)?.title ?? null;
  const chosenRoles    = allRoles.filter((r) => selectedRoles.has(r.id)).map((r) => r.title);
  const hasSelection   = !!contractType && chosenRoles.length > 0;

  const message = buildMessage(chosenContract, chosenRoles);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent(`Opportunity for ${profile.name}`)}&body=${encodeURIComponent(message)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep dark:text-dk-ink">Hire Me</h1>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate dark:text-dk-slate">
        Build a quick spec of what you need — choose an engagement type and the role(s) that fit.
        The summary updates live and you can send it straight to me via WhatsApp or Email.
      </p>

      {/* Step 1: Contract type */}
      <section className="mt-10">
        <StepLabel n={1} label="Engagement type" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {contractTypes.map((c) => (
            <button
              key={c.id}
              onClick={() => setContractType(c.id)}
              aria-pressed={contractType === c.id}
              className={`rounded border p-4 text-left transition-all ${
                contractType === c.id
                  ? "border-navy-deep dark:border-dk-navy bg-navy-deep dark:bg-dk-navy text-white"
                  : "border-line dark:border-dk-line bg-surface dark:bg-dk-surface text-ink dark:text-dk-ink hover:border-navy dark:hover:border-dk-navy"
              }`}
            >
              <p className="font-display font-bold text-sm sm:text-base">{c.title}</p>
              <p className={`mt-1 text-xs leading-relaxed ${contractType === c.id ? "text-white/75" : "text-slate dark:text-dk-slate"}`}>
                {c.blurb}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Roles */}
      <section className="mt-12">
        <StepLabel n={2} label="Role(s) — select any that apply" />
        <div className="mt-6 space-y-8">
          {roleGroups.map((group) => (
            <div key={group.track}>
              <p className="font-mono text-xs uppercase tracking-widest text-trace dark:text-dk-trace mb-3">
                {group.track}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.roles.map((role) => {
                  const active = selectedRoles.has(role.id);
                  return (
                    <button
                      key={role.id}
                      onClick={() => toggleRole(role.id)}
                      aria-pressed={active}
                      className={`rounded border p-4 text-left transition-all ${
                        active
                          ? "border-trace dark:border-dk-trace bg-trace/10 dark:bg-dk-trace/10"
                          : "border-line dark:border-dk-line bg-surface dark:bg-dk-surface hover:border-navy dark:hover:border-dk-navy"
                      }`}
                    >
                      <p className="font-display text-sm font-bold text-navy-deep dark:text-dk-ink leading-snug">
                        {role.title}
                      </p>
                      <p className="mt-1 text-xs text-slate dark:text-dk-slate leading-relaxed">{role.blurb}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3: Summary + Send */}
      <section className="mt-12">
        <StepLabel n={3} label="Summary & Send" />
        <div className="mt-4 rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface p-5 sm:p-6">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-slate dark:text-dk-slate">
                Engagement type
              </dt>
              <dd className="mt-1.5 font-display font-bold text-navy-deep dark:text-dk-ink">
                {chosenContract ?? <span className="text-slate dark:text-dk-slate font-normal">—</span>}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-slate dark:text-dk-slate">
                Role(s)
              </dt>
              <dd className="mt-1.5">
                {chosenRoles.length ? (
                  <ul className="space-y-1">
                    {chosenRoles.map((r) => (
                      <li key={r} className="font-display font-bold text-navy-deep dark:text-dk-ink text-sm">
                        {r}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-slate dark:text-dk-slate">—</span>
                )}
              </dd>
            </div>
          </dl>

          {/* Message preview */}
          {hasSelection && (
            <div className="mt-5 rounded bg-paper dark:bg-dk-bg border border-line dark:border-dk-line p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-slate dark:text-dk-slate mb-2">
                Preview — message that will be sent
              </p>
              <pre className="whitespace-pre-wrap font-mono text-xs text-ink dark:text-dk-ink leading-relaxed">
                {message}
              </pre>
            </div>
          )}

          {/* Send buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {/* WhatsApp */}
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setSent("whatsapp")}
              className={`flex items-center justify-center gap-2.5 rounded border px-4 py-3 font-mono text-sm transition-all ${
                hasSelection
                  ? "border-[#25D366] bg-[#25D366] text-white hover:bg-[#1ebe5d] cursor-pointer"
                  : "border-line dark:border-dk-line text-slate dark:text-dk-slate cursor-not-allowed opacity-50 pointer-events-none"
              }`}
              aria-disabled={!hasSelection}
            >
              <WhatsAppIcon />
              Send via WhatsApp
            </a>

            {/* Email */}
            <a
              href={emailHref}
              onClick={() => setSent("email")}
              className={`flex items-center justify-center gap-2.5 rounded border px-4 py-3 font-mono text-sm transition-all ${
                hasSelection
                  ? "border-navy-deep dark:border-dk-navy text-navy-deep dark:text-dk-navy hover:bg-navy-deep dark:hover:bg-dk-navy hover:text-white cursor-pointer"
                  : "border-line dark:border-dk-line text-slate dark:text-dk-slate cursor-not-allowed opacity-50 pointer-events-none"
              }`}
              aria-disabled={!hasSelection}
            >
              <EmailIcon />
              Send via Email
            </a>
          </div>

          {!hasSelection && (
            <p className="mt-3 font-mono text-xs text-slate dark:text-dk-slate">
              Select an engagement type and at least one role to activate the send buttons.
            </p>
          )}

          {sent && (
            <p className="mt-3 font-mono text-xs text-trace dark:text-dk-trace animate-fade-in">
              ✓ Opening {sent === "whatsapp" ? "WhatsApp" : "your email client"} — thank you for reaching out!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function StepLabel({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-trace dark:border-dk-trace bg-paper dark:bg-dk-bg font-mono text-xs text-navy-deep dark:text-dk-ink">
        {n}
      </span>
      <span className="flex-1 h-px bg-line dark:bg-dk-line" />
      <h2 className="font-display text-lg sm:text-xl font-bold text-navy-deep dark:text-dk-ink shrink-0">{label}</h2>
      <span className="flex-1 h-px bg-line dark:bg-dk-line hidden sm:block" />
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
