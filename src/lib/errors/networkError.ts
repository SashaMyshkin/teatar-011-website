//1300-1399
export enum NetworkErrorCodes {
  ConnectionFailure = 1300,
  MalformedResponse = 1301,
  UnprocessableRequest = 1302,
}

export const NetworkErrorRegistry = {
  [NetworkErrorCodes.ConnectionFailure]: {
    message: "Failed to connect to the server.",
    type: "NetworkError",
    status: 502,
  },
  [NetworkErrorCodes.MalformedResponse]: {
    message: "Received a malformed response.",
    type: "NetworkError",
    status: 502,
  },
  [NetworkErrorCodes.UnprocessableRequest]: {
    message: "Unable to process the request.",
    type: "NetworkError",
    status: 502,
  },
} as const;
