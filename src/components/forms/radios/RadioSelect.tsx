import React from "react";

type Option<T extends string> = {
  value: T;
  label: string;
  isPreselected?: boolean; // parent can use this to set initial value
};

type Props<V extends string, T extends Option<V>> = {
  options: T[];
  value: V | null;
  onChange?: (value: V) => void;
  name: string;
  orientation: "horizontal" | "vertical";
};

export default function RadioSelect<V extends string, T extends Option<V>>({
  options,
  value,
  onChange,
  name,
  orientation,
}: Props<V, T>) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={`flex ${
        orientation === "vertical" ? "flex-col" : "flex-row"
      } gap-3`}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            className="sr-only"
          />
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              value === opt.value ? "border-blue-500" : "border-gray-400"
            }`}
            aria-hidden="true"
          >
            {value === opt.value && (
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            )}
          </span>
          <span
            className={`transition-colors ${
              value === opt.value ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}
