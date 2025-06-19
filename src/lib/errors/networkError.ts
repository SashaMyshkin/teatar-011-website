//1300-1399
export enum NetworkErrorCodes {
  ConnectionFailure = 1300,
}

export const NetworkErrorRegistry = {
  [NetworkErrorCodes.ConnectionFailure]: {
    message: "Connection failure.",
    type: "NetworkError",
    status: 502,
  },
} as const;
