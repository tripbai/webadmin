/**
 * Compares two objects and returns a new object containing only the fields that have changed.
 * @param original The original object
 * @param updated The updated object
 * @returns An object containing only the fields that have changed
 */
export const getUpdatedFields = <T extends Record<string, any>>(
  original: T,
  updated: Partial<T>
): Partial<T> => {
  const changed: Partial<T> = {};
  for (const key of Object.keys(updated) as (keyof T)[]) {
    if (updated[key] !== undefined && original[key] !== updated[key]) {
      changed[key] = updated[key]!;
    }
  }
  return changed;
};
