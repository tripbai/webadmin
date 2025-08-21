import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string | null>>;

export default function useForm<T extends { [key: string]: any }>(
  initialValues: T
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const setError = <K extends keyof T>(field: K, message?: string | null) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  return { values, errors, setValue, setError };
}
