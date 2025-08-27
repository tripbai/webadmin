import { JSX, useId, useState } from "react";

type Props = {
  value: string;
  label: string;
  onChange: (value: string) => void;
  format: (value: string) => string;
  placeholder?: string;
  renderLeftIcon?: () => JSX.Element;
  errorMessage?: string | null;
};

export function DualRepresentationInput({
  value,
  onChange,
  format,
  placeholder,
  label,
  errorMessage,
  renderLeftIcon,
}: Props) {
  const [focused, setFocused] = useState(false);
  const inputId = useId();
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
          value={focused ? value : format(value)}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`is-input pr-3 ${renderLeftIcon ? "pl-11" : "pl-3"}`}
        />
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
