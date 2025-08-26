import locations from "@/data/locations.json";

type LocationMap = Record<string, string>;

interface SearchOptions {
  limit?: number;
}

/**
 * Search locations by partial name.
 * Case-insensitive. Returns array of { id, name }.
 *
 * @param query - search text
 * @param options - optional { limit }
 */
export function searchLocations(
  query: string,
  options: SearchOptions = {}
): Array<{ id: string; name: string }> {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  const { limit } = options;
  const results: Array<{ id: string; name: string }> = [];
  for (const [id, name] of Object.entries(locations as LocationMap)) {
    if (name.toLowerCase().includes(lowerQuery)) {
      results.push({ id, name });
      if (limit && results.length >= limit) break;
    }
  }
  return results;
}
