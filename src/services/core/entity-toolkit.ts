import * as Core from "@/types/core/module/types";

export function assertValidEntityId(id: unknown): asserts id is Core.Entity.Id {
  const regex = /^[a-zA-Z0-9]+$/;
  if (typeof id !== "string") {
    throw new Error("entity_id must be type of string");
  }
  if (!regex.test(id)) {
    throw new Error("entity_id value contains illegal characters");
  }
  if (id.length !== 32) {
    throw new Error("entity_id value length is incorrect");
  }
}
