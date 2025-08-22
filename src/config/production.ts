import { PublicConfig } from "@/types/configs";

/**
 * @TODO Fill in the production configuration with the actual values
 */
const productionConfiguration: PublicConfig = {
  buildMode: "production",
  iauth: {
    host: "http://localhost:5458",
  },
  kryptodoc: {
    host: "http://localhost:8000",
    namespace: "CknEEXZPwDe8uMtk3E8B5TQbdkOctlxP",
  },
  tripbai: {
    host: "http://localhost:5458",
  },
};

export default productionConfiguration;
