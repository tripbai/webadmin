import AutocompleteInput from "@/components/forms/inputs/AutocompleteInput";
import { getLocationById } from "@/services/tripbai/locations/getLocationById";
import { searchLocations } from "@/services/tripbai/locations/searchLocations";

type Props = {
  label: string;
  placeholder: string;
  initialLocationId?: string;
};

export default function SearchLocation({
  label,
  placeholder,
  initialLocationId,
}: Props) {
  let initialLabel: string | undefined = undefined;
  if (initialLocationId) {
    // If there's an initial location, set it as the default input value
    const location = getLocationById(initialLocationId);
    initialLabel = location ? location : undefined;
  }
  return (
    <AutocompleteInput
      placeholder={placeholder}
      label={label}
      onSubmit={async (searchTerm) => {
        const results = searchLocations(searchTerm, {
          limit: 5,
        });
        return results.map((result) => {
          return {
            value: result.id,
            label: result.name,
          };
        });
      }}
      onSelectResult={(result) => {
        console.log("Selected location:", result);
      }}
      renderLeftIcon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="m21.51 6.14-5-3a.99.99 0 0 0-.87-.08L8.09 5.89 3.51 3.14a.99.99 0 0 0-1.01-.01c-.31.18-.51.51-.51.87v13c0 .35.18.68.49.86l5 3c.26.16.58.19.87.08l7.55-2.83 4.59 2.75c.16.1.34.14.51.14s.34-.04.49-.13c.31-.18.51-.51.51-.87V7a.99.99 0 0 0-.49-.86M7 18.23l-3-1.8V5.77l3 1.8v10.67Zm8-1.93-6 2.25V7.69l6-2.25zm5 1.93-3-1.8V5.77l3 1.8v10.67Z"></path>
        </svg>
      )}
    />
  );
}
