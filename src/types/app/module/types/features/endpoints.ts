import * as Core from "../../../../core/module/types";

export type RegisterDefaultFeature = {
  request: {
    path: "/tripbai/features";
    method: "POST";
    data: {
      key: string;
      value: string;
      package_id: Core.Entity.Id;
    };
  };
  response: {
    entity_id: Core.Entity.Id;
    key: string;
    value: string;
  };
};
export type GetAllDefaultFeatures = {
  request: {
    path: "/tripbai/features";
    method: "GET";
  };
  response: Array<{
    key: string;
    value: string;
    category: string;
    description: string | null;
    org_mutable: boolean;
  }>;
};
export type GetFeature = {
  request: {
    path: "/tripbai/feature?key=:key&featurable_entity_id=:featurable_entity_id&featurable_entity_type=:featurable_entity_type";
    method: "GET";
  };
  response: {
    key: string;
    value: string;
    category: string;
    description: string | null;
    org_mutable: boolean;
    featurable_entity_id: Core.Entity.Id;
    featurable_entity_type: "organization" | "store";
  };
};
export type CreateFeatureOverride = {
  request: {
    path: "/tripbai/features/overrides";
    method: "POST";
    data: {
      key: string;
      value: string;
      package_id: Core.Entity.Id;
      organization_id: Core.Entity.Id;
      override_for_entity_id: Core.Entity.Id;
      override_for_entity_type: "organization" | "store";
    };
  };
  response: {};
};
