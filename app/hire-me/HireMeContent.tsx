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

export default function HireMeContent() {
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const message = useMemo(() => buildMessage(selectedContract, selectedRoles), [selectedContract, selectedRoles]);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate dark:text-dk-slate">
        Build a quick spec of what you need — choose an engagement type and the role(s) that fit. The summary updates live and you can send it straight to me.
      </p>
      <div className="trace-line mt-6" />

      <div className="mt-12 grid gap-12 sm:grid-cols-2">
        {/* Left: Selection */}
        <div className="space-y-8">
          {/* Engagement Type */}
          <div>
            <h2 className="font-display font-bold text-navy-deep dark:text-dk-ink">Engagement Type</h2>
            <div className="mt-4 space-y-2">
              {contractTypes.map((type) => (
                <label key={type.id} className="flex cursor-pointer items-center gap-3 rounded border border-line dark:border-dk-line p-3 hover:bg-surface dark:hover:bg-dk-surface transition-colors">
                  <input type="radio" name="contract" value={type.id} checked={selectedContract === type.id} onChange={(e) => setSelectedContract(e.target.value)} className="cursor-pointer" />
                  <span className="text-sm">{type.title}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div>
            <h2 className="font-display font-bold text-navy-deep dark:text-dk-ink">Roles</h2>
            <div className="mt-4 space-y-3">
              {roleGroups.map((group) => (
                <div key={group.track}>
                  <p className="font-mono text-xs uppercase tracking-widest text-slate dark:text-dk-slate">{group.track}</p>
                  <div className="mt-2 space-y-2 pl-0">
                    {group.roles.map((role) => (
                      <label key={role.id} className="flex cursor-pointer items-center gap-3">
                        <input type="checkbox" checked={selectedRoles.includes(role.id)} onChange={(e) => setSelectedRoles(e.target.checked ? [...selectedRoles, role.id] : selectedRoles.filter((r) => r !== role.id))} className="cursor-pointer" />
                        <span className="text-sm">{role.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div>
          <h2 className="font-display font-bold text-navy-deep dark:text-dk-ink">Summary</h2>
          <div className="mt-4 rounded border border-line dark:border-dk-line p-4 bg-surface dark:bg-dk-surface min-h-60">
            <p className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-slate dark:text-dk-slate">{message}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a href={waUrl} target="_blank" rel="noreferrer" className="rounded bg-green-600 hover:bg-green-700 px-4 py-3 text-center text-sm font-mono font-bold text-white transition-colors">
              Send via WhatsApp →
            </a>
            <a href={`mailto:${profile.email}?subject=Opportunity&body=${encodeURIComponent(message)}`} className="rounded border border-navy-deep dark:border-dk-navy px-4 py-3 text-center text-sm font-mono font-bold text-navy-deep dark:text-dk-navy hover:bg-navy-deep hover:text-white dark:hover:bg-dk-navy transition-colors">
              Send via Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
