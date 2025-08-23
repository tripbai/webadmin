import { useState } from "react";

type SelectProps<T extends string | number> = {
  items: T[];
  onChange?: (value: T) => void;
  defaultValue?: T;
};

export default function PrimarySelectMenu<T extends string | number>({
  items,
  onChange,
  defaultValue,
}: SelectProps<T>) {
  const [selected, setSelected] = useState<T>(defaultValue ?? items[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as T;
    setSelected(value);
    onChange?.(value);
  };

  return (
    <select
      className="is-select bg-white"
      value={selected}
      onChange={handleChange}
    >
      {items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
