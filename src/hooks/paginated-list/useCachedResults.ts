import { useRef } from "react";
import { CachedResult, ResultContext } from "./types";

export function useCacheResults<T extends { [key: string]: any }>(
  resultContext: React.RefObject<ResultContext>
) {
  const cachedRegularResult = useRef<CachedResult<T>[]>([]);
  const cachedSearchResult = useRef<CachedResult<T>[]>([]);

  const getCurrentResultByContext = () => {
    if (resultContext.current === "regular") {
      return cachedRegularResult.current;
    }
    return cachedSearchResult.current;
  };

  const emptyCachedSearchResult = () => {
    if (resultContext.current === "search") {
      cachedSearchResult.current = [];
    }
  };

  const addCachedResult = (
    list: T[],
    expectedResultsPerPage: number
  ): CachedResult<T> => {
    const hasNext = list.length > 0 && list.length === expectedResultsPerPage;
    const currentResult = getCurrentResultByContext();
    const isPage = currentResult.length;
    // Check if this page is already cached
    const existing = currentResult.find((r) => r.isPage === isPage);
    if (existing) return existing;
    const newResult = { isPage: isPage, hasNext, list };
    currentResult.push(newResult);
    return newResult;
  };

  /**
   * Get the cached result for a specific page.
   * @param page The page number to retrieve.
   * @returns The cached result for the specified page, or undefined if not found.
   */
  const getCachedResultAtPage = (page: number) => {
    if (page < 0) return;
    const currentResult = getCurrentResultByContext();
    return currentResult.find((result) => result.isPage === page);
  };

  return {
    getCurrentResultByContext,
    getCachedResultAtPage,
    emptyCachedSearchResult,
    addCachedResult,
  };
}
