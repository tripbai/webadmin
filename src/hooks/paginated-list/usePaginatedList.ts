import { useEffect, useRef, useState } from "react";
import { useCacheResults } from "./useCachedResults";
import { ResultContext, UsePaginatedList } from "./types";
import useResultContext from "./useResultContext";
import usePageTracker from "./usePageTracker";

type StatusState = {
  isLoading: boolean;
  isError: boolean;
};

type Params<T extends { [key: string]: any }> = {
  /**
   * The expected number of results per page.
   */
  expectedResultsPerPage: number;
  /**
   * Fetch data for a specific page.
   * @param page The page number to fetch data for. This can be used
   * to determine the pagination offset, which is the number of items to skip,
   * for relational databases.
   * @param previousResult The previous result set to use for fetching. This
   * can be used to determine the last document ID for pagination, for
   * cursor-based pagination.
   * @returns A promise that resolves to the fetched data.
   */
  dataFetcher: (
    params:
      | {
          context: "regular";
          page: number;
          previousResult: T[];
        }
      | {
          context: "search";
          query: string;
          page: number;
          previousResult: T[];
        }
  ) => Promise<T[]>;
};

export default function usePaginatedList<T extends { [key: string]: any }>({
  expectedResultsPerPage,
  dataFetcher,
}: Params<T>): UsePaginatedList<T> {
  const [currentList, setCurrentList] = useState<T[]>([]);
  const [status, setStatus] = useState<StatusState>({
    isLoading: false,
    isError: false,
  });
  const searchQueryRef = useRef<string>("");
  const hasNextPageRef = useRef<boolean>(false);
  const hasPreviousPageRef = useRef<boolean>(false);
  const { switchToSearchContext, switchToRegularContext, getCurrentContext } =
    useResultContext<T>();
  const {
    getCurrentResultByContext,
    getCachedResultAtPage,
    emptyCachedSearchResult,
    addCachedResult,
  } = useCacheResults<T>(getCurrentContext());
  const {
    getCurrentPage,
    hasNextPage,
    hasPreviousPage,
    resetPageCursor,
    incrementPageCursor,
    decrementPageCursor,
  } = usePageTracker<T>(getCurrentResultByContext, getCachedResultAtPage);

  /**
   * Triggers a fetch for the next page of results.
   * @returns void
   */
  const triggerNextPageFetch = () => {
    if (!hasNextPage()) return;
    incrementPageCursor();
    fetchData();
  };

  /**
   * Triggers a fetch for the previous page of results.
   * @returns void
   */
  const triggerPreviousPageFetch = () => {
    if (!hasPreviousPage()) return;
    decrementPageCursor();
    fetchData();
  };

  const startSearchResultContext = (query: string) => {
    // When the result context is set to search,
    // First, we reset the page cursor
    resetPageCursor();
    // Next we store the query string
    searchQueryRef.current = query;
    // Then, we switch to the search result context
    switchToSearchContext();
    // Next we empty out any previous search result
    emptyCachedSearchResult();
    // Then we fetch data with the query string
    fetchData(query);
  };

  const closeSearchContext = () => {
    // When the user exits out from search, we switch back to the regular context
    // First, we reset the page cursor, landing them to the page 1
    resetPageCursor();
    // Then we switch back to the regular context
    switchToRegularContext();
    // Lastly, we render the page 1 of the cached result
    fetchData();
  };

  /**
   * Introduces a delay for a specified duration.
   * @param ms The duration of the delay in milliseconds.
   * @returns A promise that resolves after the specified delay.
   */
  const intentionalDelay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  /**
   * Fetch data for a specific page.
   * @param page The page number to fetch data for.
   */
  const fetchData = async (query: string | null = null) => {
    const queryString = query ?? searchQueryRef.current;
    setStatus({ isLoading: true, isError: false });
    try {
      const currentPage = getCurrentPage();
      console.log(`fetching data for page ${currentPage}`);
      const cachedData = getCachedResultAtPage(currentPage);
      if (cachedData) {
        await intentionalDelay(500);
        hasNextPageRef.current = cachedData.hasNext;
        hasPreviousPageRef.current = currentPage > 0;
        setCurrentList(cachedData.list);
      } else {
        const previousResult = getCachedResultAtPage(currentPage - 1);
        const resultContext = getCurrentContext();
        let data: T[] = [];
        if (resultContext.current === "search") {
          data = await dataFetcher({
            context: "search",
            query: queryString || "",
            page: currentPage + 1,
            previousResult: previousResult ? previousResult.list : [],
          });
        } else {
          data = await dataFetcher({
            context: "regular",
            page: currentPage + 1,
            previousResult: previousResult ? previousResult.list : [],
          });
        }
        const cacheResult = addCachedResult(data, expectedResultsPerPage);
        hasNextPageRef.current = cacheResult.hasNext;
        hasPreviousPageRef.current = currentPage > 0;
        setCurrentList(data);
      }
      setStatus({ isLoading: false, isError: false });
    } catch (error) {
      setStatus({ isLoading: false, isError: true });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {
    list: currentList,
    isLoading: status.isLoading,
    isError: status.isError,
    hasNextPage: hasNextPageRef,
    triggerNextPageFetch: triggerNextPageFetch,
    hasPreviousPage: hasPreviousPageRef,
    triggerPreviousPageFetch: triggerPreviousPageFetch,
    startSearchResultContext: startSearchResultContext,
    closeSearchResultContext: closeSearchContext,
  };
}
