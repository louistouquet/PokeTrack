import { getSetSnapshot } from "@/lib/data";

// Prix du jour d'une extension, pour la collection (côté navigateur).
export async function GET(_req: Request, { params }: RouteContext<"/api/sets/[id]">) {
  const snapshot = await getSetSnapshot((await params).id);
  if (!snapshot) return Response.json({ error: "Extension introuvable" }, { status: 404 });
  return Response.json(snapshot, { headers: { "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
