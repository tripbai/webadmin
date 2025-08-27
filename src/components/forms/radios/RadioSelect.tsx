import React, { useState, useEffect } from "react";

type Option<T extends string> = {
  value: T;
  label: string;
  isPreselected?: boolean;
};

type Props<V extends string, T extends Option<V>> = {
  options: T[];
  onChange?: (value: T["value"]) => void;
  name: string;
  orientation: "horizontal" | "vertical";
};

export default function RadioSelect<V extends string, T extends Option<V>>({
  options,
  onChange,
  name,
  orientation,
}: Props<V, T>) {
  const [selected, setSelected] = useState<string | null>(null);
  // Preselect option if exists
  useEffect(() => {
    const preselected = options.find((opt) => opt.isPreselected);
    if (preselected) {
      setSelected(preselected.value);
      onChange?.(preselected.value);
    }
  }, [options, onChange]);
  const handleChange = (value: T["value"]) => {
    setSelected(value);
    onChange?.(value);
  };
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={`flex flex-${
        orientation === "vertical" ? "col" : "row"
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
            checked={selected === opt.value}
            onChange={() => handleChange(opt.value)}
            className="sr-only"
          />
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              selected === opt.value ? "border-blue-500" : "border-gray-400"
            }`}
            aria-hidden="true"
          >
            {selected === opt.value && (
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            )}
          </span>
          <span
            className={`transition-colors ${
              selected === opt.value ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}
