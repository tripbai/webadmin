import PrimarySelectMenu from "@/components/forms/select-menus/PrimarySelectMenu";
import * as TripBai from "@/types/app/module/types";
import * as Core from "@/types/core/module/types";
import { useState } from "react";
import config from "@/config";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import useForm from "@/hooks/forms/useForm";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  organization: TripBai.Organizations.Endpoints.InternalGetOrganization["response"];
};

export default function OrganizationPackage({ organization }: Props) {
  const {
    values,
    errors,
    setValue,
    setError,
    hasChange,
    submitForm,
    isSubmitting,
  } = useForm({
    initialValues: {
      packageId: organization.package_id,
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    },
  });
  const toPackageName = (packageId: Core.Entity.Id) => {
    switch (packageId) {
      case config.packageIds.freePlan:
        return "Free Plan";
      case config.packageIds.starterPlan50:
        return "Starter Plan 50";
      case config.packageIds.proPlan250:
        return "Pro Plan 250";
      default:
        return "Unknown Plan";
    }
  };
  const fromPackageName = (name: string): Core.Entity.Id | null => {
    switch (name) {
      case "Free Plan":
        return config.packageIds.freePlan;
      case "Starter Plan 50":
        return config.packageIds.starterPlan50;
      case "Pro Plan 250":
        return config.packageIds.proPlan250;
      default:
        return null;
    }
  };
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">Plans and Packages</h3>
      <p className="text-gray-500 mt-1">
        Update the organization's plans and packages information here.
      </p>
      <div className="mt-4 flex items-center space-x-2">
        <PrimarySelectMenu
          items={["Free Plan", "Starter Plan 50", "Pro Plan 250"]}
          disabled={isSubmitting}
          onChange={(value) => {
            const packageId = fromPackageName(value);
            if (packageId !== null) {
              setValue("packageId", packageId);
              return;
            }
          }}
          defaultValue={toPackageName(values.packageId)}
        />
        {hasChange && (
          <ButtonWithSpinner
            onClick={async () => {
              await submitForm();
            }}
            onComplete={async () => {
              toast.success("Organization package updated successfully!");
            }}
            text="Save Changes"
            type="primary"
          />
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-between p-4 rounded-md bg-blue-50 border border-blue-300">
          <div className="flex gap-3">
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
            <div className="self-center">
              <span className="text-blue-600 font-medium">
                {toPackageName(values.packageId)}
              </span>
              <div className="text-blue-600">
                <p className="mt-2 sm:text-sm">
                  {toPackageName(values.packageId) === "Free Plan" && (
                    <>
                      This is the most basic plan. Upgrade to a paid plan for
                      more features.
                    </>
                  )}
                  {toPackageName(values.packageId) === "Starter Plan 50" && (
                    <>
                      This is a good plan for small teams. Upgrade to Pro Plan
                      250 for more features.
                    </>
                  )}
                  {toPackageName(values.packageId) === "Pro Plan 250" && (
                    <>
                      This is the highest plan. Perfect for large organization
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
