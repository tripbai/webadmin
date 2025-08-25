import { JSX, useEffect, useId, useState } from "react";

type Result<TResult extends { [key: string]: any }> = {
  data: TResult;
  element: JSX.Element;
};

type Props<TResult extends { [key: string]: any }> = {
  label: string;
  placeholder: string;
  leftIcon?: JSX.Element;
  onChange: (value: string) => Promise<Array<Result<TResult>>>;
  onSelect: (data: Result<TResult>["data"]) => void;
  delay?: number; // debounce delay in ms
};

export default function AutocompleteInput<
  TResult extends { [key: string]: any }
>({
  label,
  placeholder,
  leftIcon,
  onChange,
  onSelect,
  delay = 1000, // default: 1000ms
}: Props<TResult>) {
  const [internalValue, setInternalValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<Result<TResult>>>([]);
  const [lastSearchedValue, setLastSearchedValue] = useState<string>("");
  const inputId = useId();

  // Debounce effect with race-condition handling
  useEffect(() => {
    let cancelled = false;

    const handler = setTimeout(async () => {
      if (!internalValue || internalValue === lastSearchedValue) {
        return;
      }

      setIsLoading(true);
      try {
        const newResults = await onChange(internalValue);
        if (!cancelled) {
          setResults(newResults);
          setLastSearchedValue(internalValue);
        }
      } catch (error) {
        if (!cancelled) setResults([]);
        console.error(error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(handler);
    };
  }, [internalValue, delay, onChange, lastSearchedValue]);

  const handleSelectResult = (resultData: Result<TResult>["data"]) => {
    onSelect(resultData);
    setResults([]);
  };

  return (
    <div>
      <label htmlFor={inputId} className="text-gray-600 text-sm">
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 inset-y-0 my-auto">{leftIcon}</span>
        )}
        <input
          type="text"
          id={inputId}
          placeholder={placeholder}
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          className={`is-input pr-3 ${leftIcon ? "pl-12" : ""}`}
        />
        <div
          className={
            isLoading ? "absolute right-3 inset-y-0 my-auto spin-animation" : ""
          }
        ></div>
        <div
          className={`mt-1 w-full bg-white absolute rounded-md shadow-md ring-1 ring-gray-200 ring-opacity-5 ${
            results.length === 0 ? "hidden" : ""
          }`}
          role="listbox"
        >
          {results.map((result, index) => (
            <div
              onClick={() => handleSelectResult(result.data)}
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              role="option"
            >
              {result.element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
