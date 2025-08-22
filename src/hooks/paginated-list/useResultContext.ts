import { useRef } from "react";
import { ResultContext } from "./types";

export default function useResultContext<T extends { [key: string]: any }>() {
  const resultContext = useRef<ResultContext>("regular");
  const switchToSearchContext = () => {
    resultContext.current = "search";
  };
  const switchToRegularContext = () => {
    resultContext.current = "regular";
  };
  const getCurrentContext = () => {
    return resultContext;
  };
  return {
    switchToSearchContext,
    switchToRegularContext,
    getCurrentContext,
  };
}
