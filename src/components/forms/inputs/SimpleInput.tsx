import { useId, useState } from "react";

type Props = {
  value: string;
  label: string;
  isDisabled: boolean;
  placeholder?: string;
  error: string | null;
  onChange: (value: string) => Promise<void>;
};

export default function SimpleInput({
  label,
  value,
  error,
  isDisabled,
  placeholder,
  onChange,
}: Props) {
  const inputId = useId();
  const [inputValue, setInputValue] = useState(value);
  const handleBlur = async () => {
    if (isDisabled) return; // skip if input is disabled
    if (inputValue === value) return; // nothing changed, skip
    await onChange(inputValue);
  };
  const getInputStateBasedClass = () => {
    if (error) return "border-red-500";
    return "bg-transparent";
  };
  return (
    <div>
      <label htmlFor={inputId} className="text-gray-600 text-sm">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        disabled={isDisabled}
        className={`pr-12 pl-3 is-input ${getInputStateBasedClass()}`}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
