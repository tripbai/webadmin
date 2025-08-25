import { JSX, useEffect, useId, useState } from "react";

type Props<TResult extends { [key: string]: any }> = {
  placeholder: string;
  label: string;
  onSubmit: (searchTerm: string) => Promise<Array<TResult>>;
  onSelectResult: (result: TResult) => void;
  onDeselectResult?: () => void;
  renderResult: (data: TResult) => JSX.Element;
  delay?: number; // debounce delay
};

export default function CantonSearchInput<
  TResult extends { [key: string]: any }
>({
  placeholder,
  label,
  onSubmit,
  onSelectResult,
  onDeselectResult,
  renderResult,
  delay = 800, // 👈 debounce default
}: Props<TResult>) {
  const inputId = useId();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<TResult>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<TResult | null>(null);
  const [lastSearchedValue, setLastSearchedValue] = useState("");

  // Debounced search effect
  useEffect(() => {
    let cancelled = false;

    const handler = setTimeout(async () => {
      if (!searchTerm || searchTerm === lastSearchedValue) {
        return;
      }

      setIsLoading(true);
      try {
        const res = await onSubmit(searchTerm);
        if (!cancelled) {
          setResults(res);
          setErrorMessage(null);
          setLastSearchedValue(searchTerm);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error ? error.message : "Encountered unknown error"
          );
          setResults([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(handler);
    };
  }, [searchTerm, delay, onSubmit, lastSearchedValue]);

  const handleSelectResult = (result: TResult) => {
    setSelectedResult(result);
    setResults([]);
    onSelectResult(result);
  };

  const handleDeselectResult = () => {
    setSelectedResult(null);
    setResults([]);
    onDeselectResult?.();
  };

  return (
    <>
      {!selectedResult && (
        <div>
          <label htmlFor={inputId} className="text-gray-600 text-sm">
            {label}
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              id={inputId}
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="is-input pr-3 pl-11"
            />
            <div
              className={
                isLoading
                  ? "absolute right-3 inset-y-0 my-auto spin-animation"
                  : ""
              }
            />
            <div
              className={`mt-1 w-full bg-white absolute rounded-md shadow-md ring-1 ring-gray-200 ring-opacity-5 ${
                results.length === 0 ? "hidden" : ""
              }`}
              role="listbox"
            >
              {results.map((result, index) => (
                <div
                  key={(result as any).id ?? index}
                  onClick={() => handleSelectResult(result)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  role="option"
                >
                  {renderResult(result)}
                </div>
              ))}
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
          )}
        </div>
      )}

      {selectedResult && (
        <div>
          <label htmlFor={inputId} className="text-gray-600 text-sm">
            {label}
          </label>
          <div className="is-input px-3 flex items-center space-x-2">
            <div className="p-2 w-full bg-white rounded-md shadow-md ring-1 ring-gray-200 ring-opacity-5">
              {renderResult(selectedResult)}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-400 cursor-pointer hover:fill-indigo-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
              onClick={handleDeselectResult}
            >
              <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
