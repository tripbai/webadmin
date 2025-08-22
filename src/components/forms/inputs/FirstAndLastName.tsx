import { useState } from "react";

type Props = {
  value: {
    firstName: string;
    lastName: string;
  };
  error: string | null;
  onChange: (field: "firstName" | "lastName", value: string) => Promise<void>;
};

export default function FirstAndLastName({ value, error, onChange }: Props) {
  const [firstName, setFirstName] = useState<string>(value.firstName);
  const [lastName, setLastName] = useState<string>(value.lastName);
  const handleBlur = async (type: "firstName" | "lastName") => {
    if (type === "firstName") {
      await onChange("firstName", firstName);
    } else {
      await onChange("lastName", lastName);
    }
  };
  const getInputStateBasedClass = () => {
    if (error) return "border-red-500";
    return "bg-transparent";
  };
  return (
    <div>
      <div className="flex align-center">
        <div className="w-half mr-1">
          <label className="text-gray-600 text-sm">First Name</label>
          <input
            type="text"
            placeholder="John"
            className={`pr-12 pl-3 is-input ${getInputStateBasedClass()}`}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => handleBlur("firstName")}
          />
        </div>
        <div className="w-half ml-1">
          <label className="text-gray-600 text-sm">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            className={`pr-12 pl-3 is-input ${getInputStateBasedClass()}`}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => handleBlur("lastName")}
          />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
