import { RefObject } from "react";

export type UsePaginatedList<T extends { [key: string]: any }> = {
  /**
   * The list of items in the current page.
   */
  list: T[];
  /**
   * In the context of this hook, this indicates whether
   * the list is currently being fetched
   */
  isLoading: boolean;
  /**
   * Indicates whether this hook encounters an error
   * as the list is being fetched
   */
  isError: boolean;
  /**
   * Indicates whether there is a next page of results.
   */
  hasNextPage: RefObject<boolean>;

  /**
   * Triggers a fetch for the next page of results.
   * @returns void
   */
  triggerNextPageFetch: () => void;

  /**
   * Indicates whether there is a previous page of results.
   */
  hasPreviousPage: RefObject<boolean>;

  /**
   * Triggers a fetch for the previous page of results.
   * @returns void
   */
  triggerPreviousPageFetch: () => void;
  /**
   * Switch to the search result context.
   * @param query
   * @returns
   */
  startSearchResultContext: (query: string) => void;
  /**
   * Closes the search result context. This will reset the current list and
   * update the context to "regular".
   * @returns
   */
  closeSearchResultContext: () => void;
};

/**
 * There are two types of result contexts for this hook.
 * - "search": Indicates that the hook is in a search context.
 * - "regular": Indicates that the hook is in a regular browsing context.
 */
export type ResultContext = "search" | "regular";

export type CachedResult<T extends { [key: string]: any }> = {
  isPage: number;
  hasNext: boolean;
  list: T[];
};
