"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function TestimonialForm() {
  const [name, setName] = useState("");
  const [roleCompany, setRoleCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roleCompany, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setName("");
      setRoleCompany("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't reach the server. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded border border-line dark:border-dk-line bg-surface dark:bg-dk-surface p-5 text-sm text-slate dark:text-dk-slate">
        Thanks! Your testimonial has been submitted and will appear here once reviewed.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-slate dark:text-dk-slate">Name</label>
        <input
          type="text"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded border border-line dark:border-dk-line bg-paper dark:bg-dk-bg px-3 py-2 text-sm text-ink dark:text-dk-ink"
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-slate dark:text-dk-slate">Role / Company (optional)</label>
        <input
          type="text"
          maxLength={120}
          value={roleCompany}
          onChange={(e) => setRoleCompany(e.target.value)}
          className="mt-1 w-full rounded border border-line dark:border-dk-line bg-paper dark:bg-dk-bg px-3 py-2 text-sm text-ink dark:text-dk-ink"
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-slate dark:text-dk-slate">Message</label>
        <textarea
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded border border-line dark:border-dk-line bg-paper dark:bg-dk-bg px-3 py-2 text-sm text-ink dark:text-dk-ink"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded border border-navy-deep dark:border-dk-navy-btn bg-navy-deep dark:bg-dk-navy-btn px-4 py-2.5 text-sm text-white hover:bg-navy dark:hover:opacity-90 transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit testimonial"}
      </button>
      <p className="text-xs text-slate dark:text-dk-slate">
        Submissions are reviewed before they appear publicly.
      </p>
    </form>
  );
}
