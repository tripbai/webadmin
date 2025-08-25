import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import SimpleButton from "@/components/forms/buttons/SimpleButton";
import SearchUser from "../../admin/users/SearchUser";
import SimpleInput from "@/components/forms/inputs/SimpleInput";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function CreateOrganizationForm({ onSuccess, onCancel }: Props) {
  return (
    <div className="w-md space-y-4">
      <h3 className="text-gray-800 dark:text-gray-200 text-lg font-bold sm:text-xl">
        Create Organization
      </h3>
      <div className="space-y-2">
        <SearchUser />
        <SimpleInput
          label="Organization Name"
          value=""
          isDisabled={false}
          error={null}
          placeholder="Enter organization name"
          onChange={async (e) => {}}
        />
      </div>
      <div className="w-full pt-6 flex justify-end space-x-2">
        <SimpleButton type="secondary" text="Cancel" onClick={onCancel} />
        <ButtonWithSpinner
          onClick={async () => {}}
          text="Create"
          type="primary"
        />
      </div>
    </div>
  );
}
