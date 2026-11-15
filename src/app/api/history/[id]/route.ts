import { getSetHistory } from "@/lib/data";

// Historique quotidien des prix d'une extension.
export async function GET(_req: Request, { params }: RouteContext<"/api/history/[id]">) {
  const history = await getSetHistory((await params).id);
  return Response.json(history ?? { days: [], prices: {} }, { headers: { "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
