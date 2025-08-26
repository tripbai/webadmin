import rawLocations from "@/data/locations.json";

const locations = rawLocations as Record<string, string>;

export const getLocationById = (id: string): string | null => {
  return locations[id] ?? null;
};
