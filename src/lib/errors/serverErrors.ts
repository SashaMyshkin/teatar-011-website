//1200-1299
export enum ServerErrorCodes {
  SomethingWentWrong = 1200,
  UpstreamConnectionFailure = 1201,
  UpstreamServerError = 1202,
  UnexpectedUpstreamResponse = 1203,
  NoActiveScripts = 1204,
}

export const ServerErrorRegistry = {
  [ServerErrorCodes.SomethingWentWrong]: {
    message: "Something went wrong. :(",
    type: "ServerError",
    status: 500,
  },
  [ServerErrorCodes.UpstreamConnectionFailure]: {
    message: "Could not connect to the upstream service.",
    type: "ProxyError",
    status: 502,
  },
  [ServerErrorCodes.UpstreamServerError]: {
    message: "Upstream service returned an error.",
    type: "ProxyError",
    status: 502,
  },
  [ServerErrorCodes.UnexpectedUpstreamResponse]: {
    message: "Upstream service returned an unexpected response.",
    type: "ProxyError",
    status: 502,
  },
  [ServerErrorCodes.NoActiveScripts]: {
    message: "No active scripts found. Cannot proceed with member insertion.",
    type: "Server error",
    status: 500,
  },
} as const;
