export function formatPhilippineNumber(input: string): string {
  // Mobile numbers (11 digits, starts with 09)
  if (input.length === 11 && input.startsWith("09")) {
    return `+63 ${input.slice(1, 4)} ${input.slice(4, 7)} ${input.slice(7)}`;
  }

  // Landline (02 + 8 digits = 10 total)
  if (input.length === 10 && input.startsWith("02")) {
    return `(${input.slice(0, 2)}) ${input.slice(2, 6)} ${input.slice(6)}`;
  }

  // Landline (0XX + 7 digits = 10 total)
  if (input.length === 10 && input.startsWith("0")) {
    return `(${input.slice(0, 3)}) ${input.slice(3, 6)} ${input.slice(6)}`;
  }

  // Default: return as is (if length doesn't match common PH patterns)
  return input;
}
