function assertPhilippineLandline(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
  if (!/^\d{10}$/.test(value)) {
    throw new Error("Landline must contain exactly 10 digits");
  }
  // Metro Manila (02) or provincial (0XX)
  if (value.startsWith("02") || /^0[3-9]\d/.test(value)) {
    return;
  }
  throw new Error("Invalid Philippine landline number format");
}

function assertPhilippineMobile(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
  if (!/^\d{11}$/.test(value)) {
    throw new Error("Mobile number must contain exactly 11 digits");
  }
  if (!value.startsWith("09")) {
    throw new Error("Mobile number must start with '09'");
  }
}
