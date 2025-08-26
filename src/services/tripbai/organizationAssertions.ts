import * as TripBai from "@/types/app/module/types";

export function assertIsOrganizationStatus(
  value: unknown
): asserts value is TripBai.Organizations.Fields.Status {
  if (typeof value !== "string") {
    throw new Error("invalid organization status value");
  }
  if (
    value !== "active" &&
    value !== "deactivated" &&
    value !== "suspended" &&
    value !== "pending" &&
    value !== "archived"
  ) {
    throw new Error("invalid organization status value");
  }
}

export function assertIsOrganizationType(
  value: unknown
): asserts value is TripBai.Organizations.Fields.Type {
  if (typeof value !== "string") {
    throw new Error("invalid organization type value");
  }
  if (value !== "personal" && value !== "business") {
    throw new Error("invalid organization type value");
  }
}

export function assertIsOrganizationBusinessName(
  value: unknown
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Invalid organization business name value");
  }
  if (value.length < 5 || value.length > 120) {
    throw new Error(
      "Organization business name must be more than 5 characters"
    );
  }
}
