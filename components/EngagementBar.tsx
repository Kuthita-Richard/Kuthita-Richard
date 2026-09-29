"use client";
import { useEffect, useState } from "react";

type Props = {
  entryId: string;
  initialViews: number;
  initialLikes: number;
};

const VIEWED_KEY = "updates:viewed"; // sessionStorage — one view per tab session
const LIKED_KEY = "updates:liked"; // localStorage — persists across visits

function readIdSet(storage: Storage, key: string): Set<string> {
  try {
    const raw = storage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export default function EngagementBar({ entryId, initialViews, initialLikes }: Props) {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  // Record a view once per browser tab session, and reflect whether this
  // browser already liked the post (so the heart shows the right state).
  useEffect(() => {
    try {
      const liked = readIdSet(window.localStorage, LIKED_KEY).has(entryId);
      setLiked(liked);
    } catch {
      // localStorage unavailable — fine, just skip persisted like state
    }

    try {
      const viewed = readIdSet(window.sessionStorage, VIEWED_KEY);
      if (!viewed.has(entryId)) {
        viewed.add(entryId);
        window.sessionStorage.setItem(VIEWED_KEY, JSON.stringify([...viewed]));
        fetch("/api/engagement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: entryId, action: "view" }),
        })
          .then((r) => r.json())
          .then((d) => typeof d.views === "number" && setViews(d.views))
          .catch(() => {});
      }
    } catch {
      // sessionStorage unavailable — skip view tracking rather than error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryId]);

  async function handleLike() {
    if (busy) return;
    setBusy(true);
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((n) => n + (nextLiked ? 1 : -1));

    try {
      const res = await fetch("/api/engagement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entryId, action: nextLiked ? "like" : "unlike" }),
      });
      const data = await res.json();
      if (typeof data.likes === "number") setLikes(data.likes);

      const set = readIdSet(window.localStorage, LIKED_KEY);
      if (nextLiked) set.add(entryId);
      else set.delete(entryId);
      window.localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
    } catch {
      // request failed — roll back the optimistic update
      setLiked(!nextLiked);
      setLikes((n) => n - (nextLiked ? 1 : -1));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 flex items-center gap-4 font-mono text-xs text-slate dark:text-dk-slate">
      <span aria-label={`${views} views`}>👁 {views}</span>
      <button
        type="button"
        onClick={handleLike}
        disabled={busy}
        aria-pressed={liked}
        className={`flex items-center gap-1 transition-colors ${
          liked ? "text-trace-text dark:text-dk-trace" : "hover:text-trace-text dark:hover:text-dk-trace"
        }`}
      >
        <span aria-hidden>{liked ? "❤️" : "🤍"}</span> {likes}
      </button>
    </div>
  );
}
