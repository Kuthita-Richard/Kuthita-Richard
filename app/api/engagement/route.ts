import { getEngagement, recordView, toggleLike } from "@/lib/engagement";

// GET /api/engagement?ids=a,b,c — batch-fetch views+likes for a set of
// Updates entries in one round trip, rather than one request per card.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = (searchParams.get("ids") ?? "").split(",").filter(Boolean);
  const data = await getEngagement(ids);
  return Response.json({ engagement: data });
}

// POST { id, action: "view" | "like" | "unlike" }
export async function POST(req: Request) {
  let body: { id?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { id, action } = body;
  if (!id || !["view", "like", "unlike"].includes(action ?? "")) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (action === "view") {
    const views = await recordView(id);
    return Response.json({ views });
  }

  const likes = await toggleLike(id, action === "like");
  return Response.json({ likes });
}
