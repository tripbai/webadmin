import * as Core from "@/types/core/module/types";
import * as Fields from "./fields";
import * as Locations from "../locations";

/**
 * A public snippet of organization data
 */
export type Snippet = {
  entity_id: Core.Entity.Id;
  business_name: string;
  profile_photo: Core.Uploads.FilePath | null;
  cover_photo: Core.Uploads.FilePath | null;
  type: Fields.Type;
  status: Fields.Status;
  location_id: Locations.Id;
  mobile_number: string | null;
  telephone_number: string | null;
  created_at: string;
};
