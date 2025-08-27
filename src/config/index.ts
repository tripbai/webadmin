import { PublicConfig } from "@/types/configs";
import devConfig from "./development";
import prodConfig from "./production";
import * as Core from "@/types/core/module/types";

const configs = {
  development: devConfig,
  production: prodConfig,
};

let env = process.env.NEXT_PUBLIC_APP_ENV || "development";
if (env !== "development" && env !== "production") {
  throw new Error(
    `Invalid environment: ${env}. Expected 'development' or 'production'.`
  );
}

const envBasedConfig = configs[env] as PublicConfig & {
  readonly packageIds: {
    readonly freePlan: Core.Entity.Id;
    readonly starterPlan50: Core.Entity.Id;
    readonly proPlan250: Core.Entity.Id;
  };
};

let freePlanPackageId = process.env.NEXT_PUBLIC_PACKAGE_ID_FREE_PLAN || "";
let starterPlan50PackageId =
  process.env.NEXT_PUBLIC_PACKAGE_ID_STARTER_PLAN_50 || "";
let proPlan250PackageId = process.env.NEXT_PUBLIC_PACKAGE_ID_PRO_PLAN_250 || "";

if (freePlanPackageId === "") {
  throw new Error("Missing environment variable: PACKAGE_ID_FREE_PLAN");
}
if (starterPlan50PackageId === "") {
  throw new Error("Missing environment variable: PACKAGE_ID_STARTER_PLAN_50");
}
if (proPlan250PackageId === "") {
  throw new Error("Missing environment variable: PACKAGE_ID_PRO_PLAN_250");
}

// @ts-expect-error - should be readonly
envBasedConfig.packageIds = {
  freePlan: freePlanPackageId,
  starterPlan50: starterPlan50PackageId,
  proPlan250: proPlan250PackageId,
};

export default envBasedConfig;
