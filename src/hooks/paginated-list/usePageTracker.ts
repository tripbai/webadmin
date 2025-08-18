import { useRef } from "react";
import { CachedResult } from "./types";

export default function usePageTracker<T extends { [key: string]: any }>(
  getCurrentResultByContext: () => CachedResult<T>[],
  getCachedResultAtPage: (page: number) => CachedResult<T> | undefined
) {
  const pageCursor = useRef<number>(0);
  const hasNextPage = () => {
    const currentResult = getCachedResultAtPage(pageCursor.current);
    return currentResult ? currentResult.hasNext : false;
  };
  const hasPreviousPage = () => {
    const currentResult = getCurrentResultByContext();
    return currentResult.length > 0 && pageCursor.current > 0;
  };
  const resetPageCursor = () => {
    pageCursor.current = 0;
  };
  const incrementPageCursor = () => {
    pageCursor.current++;
  };
  const decrementPageCursor = () => {
    pageCursor.current--;
  };
  const getCurrentPage = () => {
    return pageCursor.current;
  };
  return {
    hasNextPage,
    hasPreviousPage,
    resetPageCursor,
    incrementPageCursor,
    getCurrentPage,
    decrementPageCursor,
  };
}
