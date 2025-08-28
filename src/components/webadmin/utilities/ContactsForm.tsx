import * as Core from "@/types/core/module/types";
import * as TripBai from "@/types/app/module/types";
import LandlinePhoneNumber from "@/components/admin/utilities/LandlinePhoneNumber";
import MobilePhoneNumber from "@/components/admin/utilities/MobilePhoneNumber";
import EmailAddress from "@/components/forms/inputs/EmailAddress";

type Props = {
  formTitle: string;
  formDescription: string;
  contactEntityId: Core.Entity.Id;
  landlineNumber: string | null;
  mobileNumber: string | null;
  businessEmail: string | null;
};

export default function ContactsForm({
  formTitle,
  formDescription,
  contactEntityId,
  landlineNumber,
  mobileNumber,
  businessEmail,
}: Props) {
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">{formTitle}</h3>
      <p className="text-gray-500 mt-1">{formDescription}</p>
      <div className="mt-4 space-y-2 w-full">
        <div className="flex items-center space-x-2 w-full">
          <div className="w-1/2">
            <LandlinePhoneNumber
              label="Landline Number (Optional)"
              initialValue={landlineNumber ?? ""}
            />
          </div>
          <div className="w-1/2">
            <MobilePhoneNumber
              label="Mobile Number (Optional)"
              initialValue={mobileNumber ?? ""}
            />
          </div>
        </div>
        <EmailAddress
          value={businessEmail ?? ""}
          label="Business Email (Optional)"
          error={null}
          onChange={async (value: string) => {}}
        />
      </div>
    </section>
  );
}
