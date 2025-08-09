import { PublicConfig } from "@/types/configs";
import devConfig from "./development";
import prodConfig from "./production";

const configs = {
  development: devConfig,
  production: prodConfig,
}

const env = process.env.NEXT_PUBLIC_APP_ENV || "development"

export default configs[env] as PublicConfig