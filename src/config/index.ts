import { PublicConfig } from "@/types/configs";
import devConfig from "./development";
import prodConfig from "./production";

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

export default configs[env] as PublicConfig;
