import * as Core from "@/types/core/module/types";

export const httpGet = async <
  T extends Core.Route.EndpointSchema & { request: { method: "GET" } }
>(
  config: RequestConfig<T>
): Promise<T["response"]> => {
  return await process("GET", config);
};

export const httpPost = async <
  T extends Core.Route.EndpointSchema & { request: { method: "POST" } }
>(
  config: RequestConfig<T>
): Promise<T["response"]> => {
  return await process("POST", config);
};

export const httpPut = async <
  T extends Core.Route.EndpointSchema & { request: { method: "PUT" } }
>(
  config: RequestConfig<T>
): Promise<T["response"]> => {
  return await process("PUT", config);
};

export const httpPatch = async <
  T extends Core.Route.EndpointSchema & { request: { method: "PATCH" } }
>(
  config: RequestConfig<T>
): Promise<T["response"]> => {
  return await process("PATCH", config);
};

export const httpDelete = async <
  T extends Core.Route.EndpointSchema & { request: { method: "DELETE" } }
>(
  config: RequestConfig<T>
): Promise<T["response"]> => {
  return await process("DELETE", config);
};

const populatePathPlaceholders = <T extends Core.Route.EndpointSchema>(
  config: RequestConfig<T>
) => {
  const params = config.params as { [key: string]: any };
  let path = config.path;
  for (const key in params) {
    const placeholder = `:${key}`;
    if (path.includes(placeholder)) {
      path = path.split(placeholder).join(params[key]);
    }
  }
  return path;
};

const process = async <T extends Core.Route.EndpointSchema>(
  method: Core.Route.HttpMethod,
  config: RequestConfig<T>
) => {
  const processedUrl = config.host + populatePathPlaceholders(config);
  return await run<T>(method, processedUrl, config);
};

const run = async <T extends Core.Route.EndpointSchema>(
  method: Core.Route.HttpMethod,
  url: string,
  config: RequestConfig<T>
) => {
  let payload: string | FormData = "";
  let contentType: string | false = false;
  let processData: boolean = true;

  if (config.data !== undefined) {
    if (config.data instanceof FormData) {
      payload = config.data;
      contentType = false; // FormData sets its own content type
      processData = false; // Do not process data for FormData
    } else {
      payload = JSON.stringify(config.data);
      contentType = "application/json";
      processData = true;
    }
  }

  // Set the header object
  const headers: { [key: string]: any } = {};

  // If authToken is provided, it means we need to pass it as a header
  const passRequesterToken = config.authToken !== null;
  if (passRequesterToken) {
    headers["X-Requester-Token"] = config.authToken;
  }

  if (contentType !== false) {
    headers["content-type"] = contentType;
  }

  // Construct the fetch configuration
  const fetchConfig: {
    method: Core.Route.HttpMethod;
    headers: { [key: string]: any };
    body?: string | FormData;
  } = {
    method: method,
    headers: headers,
  };

  // Unlike Ajax, fetch throws an error when you attach
  // request body to a GET request. Here, we only
  // attach the body if the method is not GET
  if (method !== "GET") {
    fetchConfig.body = payload;
  }

  const response = await fetch(url, fetchConfig);
  const expectJson = config.isJsonRes ?? true;
  const mimetype = response.headers.get("Content-Type");

  let data: { [key: string]: any };

  const isJsonResponse = mimetype && mimetype.includes("application/json");
  if (isJsonResponse) {
    if (!expectJson) {
      throw new Error("Expecting JSON response but got non-JSON response");
    }
    data = await response.json();
  } else {
    try {
      data = JSON.parse(await response.text());
    } catch {
      throw new Error("Failed to parse non-JSON response as JSON");
    }
  }

  if (response.status !== 200) {
    throw new Error(
      `Fetch request failed with status ${response.status} - ${response.statusText}`
    );
  }

  return data as T;
};

export type RequestConfig<T extends Core.Route.EndpointSchema> = {
  host: string;
  path: T["request"]["path"];
  params: Core.Route.ExtractParams<T["request"]["path"]>;
  data?: T["request"]["data"] | FormData;
  authToken: string | null;
  isJsonRes?: boolean;
};
