import { AlertProps as AlertPropsOriginal } from "@mui/material";

export type AlertProps = AlertPropsOriginal & {
  open?:boolean;
  message: string;
  title?: string;
};
