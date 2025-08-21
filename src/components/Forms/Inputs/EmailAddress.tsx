import { useState } from "react";

type Props = {
  value: string;
  error: string | null;
  onChange: (value: string) => Promise<void>;
};

export default function EmailAddress({ value, error, onChange }: Props) {
  const [email, setEmail] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const handleBlur = async () => {
    if (email === value) return; // nothing changed, skip
    try {
      setIsLoading(true);
      await onChange(email);
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
      <label htmlFor="email" className="text-gray-600 text-sm">
        Email Address
      </label>
      <div className="relative">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <input
          disabled={isLoading}
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          className={`w-full pl-12 pr-3 py-2 text-gray-500 outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${getInputStateBasedClass()}`}
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
