import { useState } from "react";

type Props = {
  value: string;
  error: string | null;
  onChange: (value: string) => Promise<void>;
};

export default function Username({ value, error, onChange }: Props) {
  const [username, setUsername] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const handleBlur = async () => {
    if (username === value) return; // nothing changed, skip
    try {
      setIsLoading(true);
      await onChange(username);
    } finally {
      setIsLoading(false);
    }
  };
  const getInputStateBasedClass = () => {
    if (isLoading) return "border-gray-300 opacity-50";
    if (error) return "border-red-500";
    return "bg-transparent";
  };
  return (
    <div className="">
      <label className="text-gray-600 text-sm">Username</label>
      <div className="relative">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="none"
        >
          <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.47 0 2.96-.37 4.44-1.1l-.89-1.79c-1.2.59-2.4.9-3.56.9-4.41 0-8-3.59-8-8S7.59 4 12 4s8 3.59 8 8v1c0 .69-.31 2-1.5 2-1.4 0-1.49-1.82-1.5-2V8h-2v.03C14.16 7.4 13.13 7 12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.45 0 2.75-.63 3.66-1.62.52.89 1.41 1.62 2.84 1.62 2.27 0 3.5-2.06 3.5-4v-1c0-5.51-4.49-10-10-10m0 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3"></path>
        </svg>
        <input
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleBlur}
          className={`pl-12 pr-3 is-input ${getInputStateBasedClass()}`}
        />
        <div
          className={
            isLoading
              ? "absolute right-3 inset-y-0 my-auto --spinner-simple"
              : ""
          }
        ></div>
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
