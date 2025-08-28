import * as Core from "@/types/core/module/types";
import * as TripBai from "@/types/app/module/types";
import SimpleInput from "@/components/forms/inputs/SimpleInput";
import SearchLocation from "@/components/admin/locations/SearchLocation";
import useForm from "@/hooks/forms/useForm";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  formTitle: string;
  formDescription: string;
  addressEntityId: Core.Entity.Id;
  lineAddress1: string;
  lineAddress2: string;
  locationId: string;
};

export default function AddressForm({
  formTitle,
  formDescription,
  addressEntityId,
  lineAddress1,
  lineAddress2,
  locationId,
}: Props) {
  const { values, errors, hasChange, isSubmitting, setValue, submitForm } =
    useForm({
      initialValues: {
        lineAddress1: lineAddress1,
        lineAddress2: lineAddress2,
        locationId: locationId,
      },
      onSubmit: async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      },
    });
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">{formTitle}</h3>
      <p className="text-gray-500 mt-1">{formDescription}</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <SimpleInput
            label="Address Line 1"
            isDisabled={isSubmitting}
            value={values.lineAddress1}
            error={errors.lineAddress1 ?? null}
            onChange={async (value) => {
              setValue("lineAddress1", value);
            }}
          />
          <SimpleInput
            label="Address Line 2"
            isDisabled={isSubmitting}
            value={values.lineAddress2}
            error={errors.lineAddress2 ?? null}
            onChange={async (value) => {
              setValue("lineAddress2", value);
            }}
          />
        </div>
        <SearchLocation
          label="Business Location"
          placeholder="Search for a location..."
          isDisabled={isSubmitting}
          initialLocationId={locationId}
          onChange={(locationId) => {
            setValue("locationId", locationId);
          }}
        />
        {hasChange && (
          <div className="w-full pt-3 flex justify-end space-x-2">
            <ButtonWithSpinner
              onClick={submitForm}
              onSuccess={() => {
                toast.success("Address updated successfully!");
              }}
              text="Save Changes"
              type="primary"
            />
          </div>
        )}
        <Toaster />
      </div>
    </section>
  );
}
