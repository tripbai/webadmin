import RadioSelect from "@/components/forms/radios/RadioSelect";
import PrimarySelectMenu from "@/components/forms/select-menus/PrimarySelectMenu";
import { useState } from "react";

export default function OrganizationTypeSelect() {
  const [selectedType, setSelectedType] = useState<"business" | "personal">(
    "business"
  );
  return (
    <div>
      <label htmlFor="organization-type" className="text-gray-600 text-sm">
        Organization Type
      </label>
      <RadioSelect
        options={[
          {
            value: "business",
            label: "Business",
            isPreselected: selectedType === "business",
          },
          {
            value: "personal",
            label: "Personal",
            isPreselected: selectedType === "personal",
          },
        ]}
        name="organization-type"
        orientation="horizontal"
        onChange={(value) => setSelectedType(value)}
      />
      <div className="mt-2">
        <div className="flex justify-between p-4 rounded-md bg-blue-50 border border-blue-300">
          <div className="flex gap-3 sm:items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-blue-600 sm:text-sm">
              {selectedType === "business"
                ? "Business-type organizations can create multiple stores and add collaborators."
                : "Personal organizations only have one store and cannot add collaborators."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
