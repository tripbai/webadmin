import * as Core from "../../../../core/module/types";
import * as Fields from "./fields";
import * as IdentityAuthority from "../../../../identity-authority/module/types";
import * as Address from "../address";
import * as Contact from "../contacts";

export type CreateOrganization = {
  request: {
    path: "/tripbai/organizations";
    method: "POST";
    data: {
      business_name: string;
      package_id: Core.Entity.Id;
      // A token that certifies the user has access to the tenant
      tenant_access_certification_token: string;
      type: Fields.Type;
      line_address_1: string;
      line_address_2: string;
      location_id: string;
      mobile_number: string | null;
      telephone_number: string | null;
      admin_user_id: string;
      organization_tenant_id: Core.Entity.Id;
    };
  };
  response: {
    // The unique identifier of the organization
    organization_id: Core.Entity.Id;
  };
};
export type GenerateAuthToken = {
  request: {
    path: "/tripbai/organizations/:organization_id/tokens";
    method: "POST";
    data: {
      // A token that certifies the user has access to the tenant
      tenant_access_certification_token: string;
    };
  };
  response: {
    upgraded_token: string;
  };
};
export type UpdateOrganization = {
  request: {
    path: "/tripbai/organizations/:organization_id";
    method: "PATCH";
    data: {
      business_name?: string;
      package_id?: Core.Entity.Id;
      status?: Fields.Status;
      type?: Fields.Type;
      line_address_1?: string;
      line_address_2?: string;
      location_id?: string;
      mobile_number?: string | null;
      telephone_number?: string | null;
      email_address?: IdentityAuthority.Users.Fields.EmailAddress | null;
    };
  };
  response: {};
};
export type InternalGetOrganization = {
  request: {
    path: "/tripbai/internal/organizations/:organization_id";
    method: "GET";
  };
  response: {
    entity_id: Core.Entity.Id;
    business_name: string;
    profile_photo: Core.Uploads.FilePath | null;
    cover_photo: Core.Uploads.FilePath | null;
    status: Fields.Status;
    type: Fields.Type;
    package_id: Core.Entity.Id;
    package_name: string;
    address_entity_id: Core.Entity.Id;
    address_category: Address.Fields.Category;
    address_label: string;
    address_is_primary: boolean;
    location_id: string;
    line_address_1: string;
    line_address_2: string;
    contact_entity_id: Core.Entity.Id;
    contact_category: Contact.Fields.Category;
    contact_label: string;
    contact_is_primary: boolean;
    mobile_number: string | null;
    telephone_number: string | null;
    email_address: IdentityAuthority.Users.Fields.EmailAddress | null;
    created_at: string;
    updated_at: string;
  };
};
export type BackfillOrganizationSnippet = {
  request: {
    method: "POST";
    path: "/tripbai/backfills/organization-snippet";
    data: {
      organization_id: Core.Entity.Id;
    };
  };
  response: {};
};
