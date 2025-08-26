import { JSX, useEffect, useId, useState } from "react";

type AutocompleteResult = {
  label: string;
  value: string;
};

type Props<TResult extends AutocompleteResult> = {
  placeholder: string;
  label: string;
  onSubmit: (searchTerm: string) => Promise<Array<TResult>>;
  onSelectResult: (result: TResult) => void;
  initialLabel?: string; // allow parent to pass initial label
  delay?: number; // debounce delay
  renderLeftIcon?: () => JSX.Element;
};

export default function AutocompleteInput<TResult extends AutocompleteResult>({
  placeholder,
  label,
  onSubmit,
  onSelectResult,
  renderLeftIcon,
  initialLabel = "",
  delay = 800,
}: Props<TResult>) {
  const inputId = useId();
  const [searchTerm, setSearchTerm] = useState(initialLabel);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<TResult>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSearchedValue, setLastSearchedValue] = useState("");

  // Sync parent-provided initial value
  useEffect(() => {
    setSearchTerm(initialLabel);
  }, [initialLabel]);

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
    setSearchTerm(result.label); // fill input with chosen label
    setLastSearchedValue(result.label); // 👈 prevent re-search
    setResults([]); // close dropdown
    onSelectResult(result); // notify parent
  };

  return (
    <div>
      <label htmlFor={inputId} className="text-gray-600 text-sm">
        {label}
      </label>
      <div className="relative">
        {renderLeftIcon && (
          <div className="absolute left-3 inset-y-0 my-auto pointer-events-none flex items-center justify-center">
            {renderLeftIcon()}
          </div>
        )}
        <input
          type="text"
          id={inputId}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`is-input pr-3 ${renderLeftIcon ? "pl-11" : "pl-3"}`}
        />
        <div
          className={
            isLoading ? "absolute right-3 inset-y-0 my-auto spin-animation" : ""
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
              {result.label}
            </div>
          ))}
        </div>
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
