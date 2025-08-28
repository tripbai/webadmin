import { DualRepresentationInput } from "@/components/forms/inputs/DualRepresentationInput";
import { formatPhilippineNumber } from "@/services/utils/formatPhilippineNumber";
import { useState } from "react";

type Props = {
  label: string;
  initialValue?: string;
  onChange?: (value: string) => void;
};

export default function LandlinePhoneNumber({
  label,
  initialValue,
  onChange,
}: Props) {
  const [value, setValue] = useState(initialValue || "");
  return (
    <DualRepresentationInput
      value={value}
      label={label}
      onChange={(val) => {
        setValue(val.replace(/\D/g, ""));
        onChange?.(val.replace(/\D/g, ""));
      }}
      format={(value) => {
        const formatted = formatPhilippineNumber(value);
        return formatted;
      }}
      placeholder="0000000000"
      renderLeftIcon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="M18.07 22h.35c.47-.02.9-.26 1.17-.64l2.14-3.09c.23-.33.32-.74.24-1.14s-.31-.74-.64-.97l-4.64-3.09a1.47 1.47 0 0 0-.83-.25c-.41 0-.81.16-1.1.48l-1.47 1.59c-.69-.43-1.61-1.07-2.36-1.82-.72-.72-1.37-1.64-1.82-2.36l1.59-1.47c.54-.5.64-1.32.23-1.93L7.84 2.67c-.22-.33-.57-.57-.97-.64a1.455 1.455 0 0 0-1.13.24L2.65 4.41c-.39.27-.62.7-.64 1.17-.03.69-.16 6.9 4.68 11.74 4.35 4.35 9.81 4.69 11.38 4.69ZM6.88 10.05c-.16.15-.21.39-.11.59.05.09 1.15 2.24 2.74 3.84 1.6 1.6 3.75 2.7 3.84 2.75.2.1.44.06.59-.11l1.99-2.15 3.86 2.57-1.7 2.46c-1.16 0-6.13-.24-9.99-4.1S4 7.06 4 5.91l2.46-1.7 2.57 3.86-2.15 1.99Z"></path>
        </svg>
      )}
    />
  );
}
