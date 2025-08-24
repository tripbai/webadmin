import { useState, useRef } from "react";

type Errors<T> = Partial<Record<keyof T, string | null>>;

type UseFormOptions<T> = {
  initialValues: T;
  onSubmit?: (values: T) => Promise<void> | void;
  onSuccess?: () => Promise<void> | void;
  onError?: (error: Error) => Promise<void> | void;
};

export default function useForm<T extends { [key: string]: any }>({
  initialValues,
  onSubmit,
  onSuccess,
  onError,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const initialRef = useRef(initialValues);

  // computed at render
  const hasChange = Object.keys(initialRef.current).some((key) => {
    return values[key as keyof T] !== initialRef.current[key as keyof T];
  });

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const setError = <K extends keyof T>(field: K, message?: string | null) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  /**
   * Submit the current form values:
   * @param nextValues
   */
  const submitForm = async (nextValues?: T) => {
    const updated = nextValues ?? values;
    try {
      if (onSubmit) {
        await onSubmit(updated);
      }
      initialRef.current = updated;
      setValues(updated);
      setErrors({});
      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      if (onError) {
        await onError(
          error instanceof Error ? error : new Error("Unknown error")
        );
      }
    }
  };

  /**
   * Rollback to baseline (discard changes).
   */
  const rollbackForm = () => {
    setValues(initialRef.current);
    setErrors({});
  };

  return {
    values,
    errors,
    hasChange,
    setValue,
    setError,
    submitForm,
    rollbackForm,
  };
}
