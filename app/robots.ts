import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

// A generic "User-agent: *" rule leaves it to chance which AI crawlers
// index vs. train on this content. Being explicit means a deliberate
// choice instead of an accident. Default here: allow bots that put you in
// front of people asking AI assistants questions (search/on-demand-fetch
// crawlers), block bots whose only purpose is scraping training data.
// Flip any entry below if you'd rather opt out entirely, or opt in to
// training too.

const TRAINING_CRAWLERS = [
  "GPTBot",        // OpenAI training
  "ClaudeBot",      // Anthropic training
  "Google-Extended", // Gemini / Vertex AI training opt-out
  "CCBot",          // Common Crawl — widely reused as training data
];

const SEARCH_AND_FETCH_CRAWLERS = [
  "OAI-SearchBot", // powers ChatGPT Search results
  "ChatGPT-User",  // on-demand fetch when a user pastes this URL into ChatGPT
  "Claude-SearchBot", // powers Claude's web search
  "Claude-User",      // on-demand fetch when a user asks Claude about this URL
  "PerplexityBot",     // Perplexity's search index
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...TRAINING_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
      ...SEARCH_AND_FETCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
