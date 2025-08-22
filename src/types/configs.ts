export type PublicConfig = {
  readonly buildMode: "development" | "production";
  readonly iauth: {
    readonly host: string;
  };
  readonly kryptodoc: {
    readonly host: string;
    readonly namespace: string;
  };
  readonly tripbai: {
    readonly host: string;
  };
};
