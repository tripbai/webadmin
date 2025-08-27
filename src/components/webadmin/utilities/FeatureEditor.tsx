import { useCallback, useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getAllFeatures } from "@/services/tripbai/features/getAllFeatures";
import PrimarySelectMenu from "@/components/forms/select-menus/PrimarySelectMenu";
import { getFeature } from "@/services/tripbai/features/getFeature";
import * as Core from "@/types/core/module/types";
import SimpleInput from "@/components/forms/inputs/SimpleInput";
import useForm from "@/hooks/forms/useForm";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  featurableEntityId: Core.Entity.Id;
  featurableEntityType: "organization" | "store";
};

export default function FeatureEditor({
  featurableEntityId,
  featurableEntityType,
}: Props) {
  const signedInUser = useSelector(
    (state: RootState) => state.signedInUser.value
  );
  const primarySelectInputId = useId();
  const [features, setFeatures] = useState<
    Array<{
      key: string;
      value: string;
      category: string;
      description: string | null;
      org_mutable: boolean;
    }>
  >([]);
  const [selectedFeature, setSelectedFeature] = useState<{
    key: string;
    value: string;
    category: string;
    description: string | null;
    org_mutable: boolean;
  } | null>(null);
  const {
    values,
    errors,
    setValue,
    setError,
    hasChange,
    submitForm,
    isSubmitting,
  } = useForm<{
    featureValue: string | null;
    hasUpdatedFeatureValue: boolean;
  }>({
    initialValues: {
      featureValue: null,
      hasUpdatedFeatureValue: false,
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    },
  });
  useEffect(() => {
    getAllFeatures({ signedInUser }).then((response) => {
      if (response) {
        response.unshift({
          key: "Select Feature...",
          value: "Select Feature",
          category: "Select Feature",
          description: null,
          org_mutable: false,
        });
        setFeatures(response);
      }
    });
  }, [signedInUser]);
  useEffect(() => {
    if (selectedFeature !== null) {
      getFeature({
        featureKey: selectedFeature.key,
        signedInUser,
        featurableEntityId: featurableEntityId,
        featurableEntityType: featurableEntityType,
      }).then((featurableEntityFeature) => {
        setValue("featureValue", featurableEntityFeature.value);
      });
    }
  }, [selectedFeature]);
  return (
    <section id="user-profile" className="w-full">
      <h3 className="text-lg font-semibold">Update Features</h3>
      <p className="text-gray-500 mt-1">
        Modify feature settings and configurations.
      </p>
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex flex-col">
          <label
            htmlFor={primarySelectInputId}
            className="text-gray-600 text-sm"
          >
            Select Feature
          </label>
          <PrimarySelectMenu
            items={features.map((feature) => feature.key)}
            onChange={(value) => {
              if (value === "Select Feature...") {
                setSelectedFeature(null);
                setValue("featureValue", null);
                setValue("hasUpdatedFeatureValue", false);
                return;
              }
              const feature = features.find((feature) => feature.key === value);
              if (!feature) return;
              setSelectedFeature(feature);
            }}
          />
        </div>
        {values.featureValue !== null && (
          <SimpleInput
            value={values.featureValue}
            label="Feature Value"
            isDisabled={false}
            error={errors.featureValue ?? null}
            onChange={async (value) => {
              setValue("featureValue", value);
              setValue("hasUpdatedFeatureValue", true);
            }}
          />
        )}
      </div>
      {hasChange && values.hasUpdatedFeatureValue && (
        <div className="mt-3">
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
        </div>
      )}
      {selectedFeature && (
        <div className="mt-4 p-4 border rounded bg-gray-50 border-gray-300 w-full">
          <h4 className="">
            {selectedFeature.key} (
            <span className="text-gray-500 font-medium">
              {selectedFeature.category}
            </span>
            )
          </h4>
          <p className="text-gray-700">
            {selectedFeature.description || "No description available."}
          </p>
        </div>
      )}
      <Toaster />
    </section>
  );
}
