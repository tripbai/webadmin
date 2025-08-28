import { DualRepresentationInput } from "@/components/forms/inputs/DualRepresentationInput";
import { formatPhilippineNumber } from "@/services/utils/formatPhilippineNumber";
import { useState } from "react";

type Props = {
  label: string;
  initialValue?: string;
  onChange?: (value: string) => void;
};

export default function MobilePhoneNumber({
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
      placeholder="00000000000"
      renderLeftIcon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="M7 22h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2M7 4h10v16H7z"></path>
          <path d="M12 17a1 1 0 1 0 0 2 1 1 0 1 0 0-2"></path>
        </svg>
      )}
    />
  );
}
