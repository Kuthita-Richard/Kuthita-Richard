import { Redis } from "@upstash/redis";

// Reads either the "official" Upstash env var names or the names Vercel's
// Marketplace integration sometimes injects, so this works regardless of
// which path was used to connect the database.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const redisConfigured = Boolean(url && token);

// Only constructed when configured — every function below checks
// redisConfigured first and fails soft otherwise, so the site works fine
// before the database is connected; engagement counts just show as zero.
const redis = redisConfigured ? new Redis({ url: url!, token: token! }) : null;

const viewKey = (id: string) => `views:${id}`;
const likeKey = (id: string) => `likes:${id}`;

export async function getEngagement(ids: string[]) {
  if (!redis || ids.length === 0) {
    return Object.fromEntries(ids.map((id) => [id, { views: 0, likes: 0 }]));
  }
  const keys = ids.flatMap((id) => [viewKey(id), likeKey(id)]);
  const values = await redis.mget<number[]>(...keys);
  const result: Record<string, { views: number; likes: number }> = {};
  ids.forEach((id, i) => {
    result[id] = { views: Number(values[i * 2] ?? 0), likes: Number(values[i * 2 + 1] ?? 0) };
  });
  return result;
}

export async function recordView(id: string) {
  if (!redis) return 0;
  return redis.incr(viewKey(id));
}

export async function toggleLike(id: string, liked: boolean) {
  if (!redis) return 0;
  const count = liked ? await redis.incr(likeKey(id)) : await redis.decr(likeKey(id));
  return Math.max(0, count);
}
