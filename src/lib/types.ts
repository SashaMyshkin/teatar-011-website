export interface Script  {
  id: number;
  name: string;
  status:number
};

export interface MembershipStatuses{
  id:number;
  code:string;
  description:string;
}

export type ErrorResponse<TCode extends number, TType extends string> = {
  code: TCode;
  message: string;
  type: TType;
};

// Utility to make only nullable fields optional
export type OptionalNullable<T> = {
  [K in keyof T as null extends T[K] ? K : never]?: Exclude<T[K], null> | null;
} & {
  [K in keyof T as null extends T[K] ? never : K]: T[K];
};
